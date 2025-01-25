/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
'use server';

import { openai } from '@ai-sdk/openai';
import * as z from "zod"
import { createStreamableValue } from 'ai/rsc';
import { streamText } from 'ai';
import { formSchema } from '../schemas';

const calculateDateDifference = (from: Date, to: Date): number => {
  const diffTime = Math.abs(to.getTime() - from.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Add 1 to include both the start and end date
};

const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const getPrompt = ({ destination_city, travel_dates, no_of_travellers, special_preferences }: any) => {
  const numberOfDays = travel_dates?.from && travel_dates?.to 
    ? calculateDateDifference(travel_dates.from, travel_dates.to)
    : 0;

  return `
  Ignore all the previous information.I want a plan a trip to ${destination_city}. You will need to generate a presentation of my future trip. Organize this presentation as follows:

  - a short introduction
  - a table including all the useful and logistical information needed to travel to the concerned countries (vaccines, currency, capital, religion, language, current ruling government in power in the city/state). Render this table in HTML
  - a detailed list of the trip you will have prepared for exactly ${numberOfDays} days. Make a detailed list with, each time, the name of the places to visit, how to get there, what activities to do. Add the coordinates (latitude, longitude) for each stage. Always separate the coordinates with a double !!. For example !!48.1469, 11.2659!! You can improvise on the length of stay in each city/country.
  - a list of must try local food and drinks.
  - a conclusion with advice and an opening to a possible continuation of the journey.
  
  My trip takes place between ${travel_dates.from} and ${travel_dates.to} (${numberOfDays} days in total).
  There will be a total of ${no_of_travellers} travellers.

  Keep in mind that:
  - I am open to travel by bus, train, car, airplane.
  - Plan for exactly ${numberOfDays} days, no more, no less.
  
  ${special_preferences ? `- These are some special requests for the trip: ${special_preferences}` : ''}

  Render the entire itenary in HTML.

  Please format the response as HTML with the following structure:
  <div class="itinerary-container">
    <h2 class="text-2xl font-bold mb-4">Trip to ${destination_city}</h2>
    
    <!-- Logistical Information Table -->
    <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Essential Travel Information</h3>
        <table class="w-full border-collapse">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border p-3 text-left">Category</th>
                    <th class="border p-3 text-left">Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border p-3 font-medium">Vaccines Required</td>
                    <td class="border p-3">[Vaccine Information]</td>
                </tr>
                <tr>
                    <td class="border p-3 font-medium">Currency</td>
                    <td class="border p-3">[Currency Details]</td>
                </tr>
                <tr>
                    <td class="border p-3 font-medium">Capital</td>
                    <td class="border p-3">[Captial Details]</td>
                </tr>
                <tr>
                    <td class="border p-3 font-medium">Religion</td>
                    <td class="border p-3">[Religion Details]</td>
                </tr>
                <tr>
                    <td class="border p-3 font-medium">Language</td>
                    <td class="border p-3">[Language Details]</td>
                </tr>
                <tr>
                    <td class="border p-3 font-medium">Ruling Government</td>
                    <td class="border p-3">[Government Details]</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Daily Itinerary -->
    <div class="day-container mb-6">
        <h3 class="text-xl font-semibold">Day 1</h3>
        ...
    </div>
  </div>
  All the text in html except the table, must be in [#019992] color and have a font of semibold.
`
}
export const streamAIResponse = async (userData: z.infer<typeof formSchema>) => {
  console.log("USER DATA", userData)
  const stream = createStreamableValue('');

  const validatedData = formSchema.safeParse(userData)
  if (validatedData?.error) {
    return { error: "Please enter valid data" }
  }

  const { destination_city, travel_dates, no_of_travellers, special_preferences } = validatedData?.data

  if (!travel_dates?.from || !travel_dates?.to) {
    return { error: "Both start and end dates are required" }
  }

  if (travel_dates.to < travel_dates.from) {
    return { error: "End date cannot be before start date" }
  }

  const numberOfDays = calculateDateDifference(travel_dates.from, travel_dates.to);
  
  if (numberOfDays > 10) {
    return { error: "Trip duration cannot exceed 10 days" }
  }

  const promptBodyParameters = {
    destination_city,
    travel_dates,
    no_of_travellers,
    special_preferences,
    numberOfDays
  }

  console.log("OPENAI KEY", process.env.OPENAI_API_KEY)
  // OpenAI API Key setup
  if (!OPENAI_API_KEY) {
    throw new Error('Missing OpenAI API key');
  }


  // Prepare the prompt using a helper function (getPrompt)
  const question = getPrompt(promptBodyParameters);

  try {
    // Call OpenAI API to generate a chat completion
    (async () => {
      const { textStream } = streamText({
        model: openai(model), // Define the model here
        temperature: 0,
        messages: [
          {
            role: 'system',
            content: "You're a travel assistant. Create detailed itineraries with intro, logistics, trip details (stops, activities, coordinates), and advice. Ensure safety. Avoid mass tourism/air travel if noted.",
          },
          {
            role: 'user',
            content: question,
          },
        ],
      });
      for await (const delta of textStream) {
        stream.update(delta);
      }
      stream.done();
    })();
    return { output: stream.value };

  } catch (error) {

    return { output: error}

  }

}




