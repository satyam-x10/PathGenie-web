'use client'

import React, { useState } from 'react';
import { ChevronRight, Search, Youtube, Globe, ExternalLink } from 'lucide-react';
const mockResponse = {
  "_id": {
    "$oid": "670a784118de98eaa69cdcf5"
  },
  "organicResults": [
    {
      "title": "How does my picking hand technique look? It feels slow ...",
      "link": "https://www.reddit.com/r/guitarlessons/comments/197phra/how_does_my_picking_hand_technique_look_it_feels/",
      "snippet": "Strumming is a different technique which requires a slight adjustment to grip. You need to especially loosen your grip so that the pick isn't ..."
    },
    {
      "title": "The proper right-hand picking technique for playing ...",
      "link": "https://music.stackexchange.com/questions/108259/the-proper-right-hand-picking-technique-for-playing-the-electric-guitar",
      "snippet": "Using as little of the pick as possible is very important but you should expect to take years developing your pick technique."
    },
    {
      "title": "[QUESTION] whats the Correct placement of right picking ...",
      "link": "https://www.reddit.com/r/Guitar/comments/t588d6/question_whats_the_correct_placement_of_right/",
      "snippet": "Picking 12 frets above the fingered note gives you the most lows. Picking nearer to the bridge lets you palm mute. Sometimes you want tight ..."
    },
    {
      "title": "Right Hand Guitar Fundamentals",
      "link": "https://www.guitarlessons.com/guitar-lessons/beginner-lessons/right-hand-guitar-fundamentals/",
      "snippet": "Curl your index finger on your picking hand and place the pick on fleshy part of the finger between the fingertip and first joint. Now bring your thumb down and ..."
    },
    {
      "title": "Is there a \"correct\" position for the right hand when playing ...",
      "link": "https://music.stackexchange.com/questions/17816/is-there-a-correct-position-for-the-right-hand-when-playing-guitar",
      "snippet": "99% of where your hand should go is determined by two things: 1. the style of music and sound you want 2. what feels comfortable to you."
    }
  ],
  "aiOverview": {
    "error": "Can't generate an AI overview right now. Try again later."
  },
  "relatedQuestions": [
    {
      "question": "Do right handed people strum with right hand?",
      "snippet": "When playing a right-handed guitar, you have to use your left hand to press the chords or strings on the fretboard and right hand to play different strumming patterns. Whereas for left-handed guitar, you have to use your right hand to press chords and your left hand to strike different strumming patterns."
    },
    {
      "question": "How do you strum when picking?"
    },
    {
      "question": "Is it better to strum with your hand or pick?",
      "snippet": "Strumming with your thumb gives you a rounder sound, and strumming with a pick gives you a brighter sound. Things to keep in mind when learning how to strum the guitar with your thumb: With the down strums, use the fleshier part of your thumb. On the up strums, your nail may catch the string."
    },
    {
      "question": "How to hold your right hand when playing guitar?"
    }
  ],
  "relatedSearches": [
    {
      "query": "Right hand technique picking and strumming guitar",
      "link": "https://www.google.com/search?sca_esv=923792fc01f6d6a7&q=Right+hand+technique+picking+and+strumming+guitar&sa=X&ved=2ahUKEwjfienD14SJAxV1w_ACHeVZDJQQ1QJ6BAhKEAE"
    },
    {
      "query": "Right hand technique picking and strumming for beginners",
      "link": "https://www.google.com/search?sca_esv=923792fc01f6d6a7&q=Right+hand+technique+picking+and+strumming+for+beginners&sa=X&ved=2ahUKEwjfienD14SJAxV1w_ACHeVZDJQQ1QJ6BAhLEAE"
    },
    {
      "query": "Right hand technique picking and strumming guitar chords",
      "link": "https://www.google.com/search?sca_esv=923792fc01f6d6a7&q=Right+hand+technique+picking+and+strumming+guitar+chords&sa=X&ved=2ahUKEwjfienD14SJAxV1w_ACHeVZDJQQ1QJ6BAhNEAE"
    },
    {
      "query": "Right hand technique picking and strumming easy",
      "link": "https://www.google.com/search?sca_esv=923792fc01f6d6a7&q=Right+hand+technique+picking+and+strumming+easy&sa=X&ved=2ahUKEwjfienD14SJAxV1w_ACHeVZDJQQ1QJ6BAhMEAE"
    },
    {
      "query": "Right hand technique picking and strumming chords",
      "link": "https://www.google.com/search?sca_esv=923792fc01f6d6a7&q=Right+hand+technique+picking+and+strumming+chords&sa=X&ved=2ahUKEwjfienD14SJAxV1w_ACHeVZDJQQ1QJ6BAhIEAE"
    },
    {
      "query": "Acoustic guitar picking hand position",
      "link": "https://www.google.com/search?sca_esv=923792fc01f6d6a7&q=Acoustic+guitar+picking+hand+position&sa=X&ved=2ahUKEwjfienD14SJAxV1w_ACHeVZDJQQ1QJ6BAhHEAE"
    },
    {
      "query": "Electric guitar picking hand position",
      "link": "https://www.google.com/search?sca_esv=923792fc01f6d6a7&q=Electric+guitar+picking+hand+position&sa=X&ved=2ahUKEwjfienD14SJAxV1w_ACHeVZDJQQ1QJ6BAhGEAE"
    },
    {
      "query": "Electric guitar right hand position",
      "link": "https://www.google.com/search?sca_esv=923792fc01f6d6a7&q=Electric+guitar+right+hand+position&sa=X&ved=2ahUKEwjfienD14SJAxV1w_ACHeVZDJQQ1QJ6BAhBEAE"
    }
  ],
  "videos": [
    {
      "title": "Right (picking) hand position on the electric guitar.",
      "link": "https://www.youtube.com/watch?v=BzW8ZWaR_R0",
      "duration": "7:48"
    },
    {
      "title": "Strumming Drills - Essential Right Hand Technique.",
      "link": "https://www.youtube.com/watch?v=SINmdEpneQs",
      "duration": "20:32"
    },
    {
      "title": "Right (picking) hand position on the acoustic guitar.",
      "link": "https://www.youtube.com/watch?v=lhIMwXHxiQE",
      "duration": "11:00"
    }
  ],
  "topicName": "Right Hand Technique Picking and Strumming Guitar"
}
const AIFuturisticSearchResults = ({ data }) => {
  const { organicResults, relatedQuestions, relatedSearches, videos, topicName } = data;
  const [activeTab, setActiveTab] = useState('organic');

  const TabButton = ({ value, label }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`py-2 px-4 font-semibold rounded-t-lg ${
        activeTab === value
          ? 'bg-gray-600 text-white'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">{topicName}</h1>
      
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        <TabButton value="organic" label="Organic Results" />
        <TabButton value="related" label="Related Questions" />
        <TabButton value="searches" label="Related Searches" />
        <TabButton value="videos" label="Videos" />
      </div>

      <div className="bg-gray-700 rounded-lg p-4 overflow-auto max-h-[70vh]">
        {activeTab === 'organic' && (
          <div className="space-y-4">
            {organicResults.map((result, index) => (
              <div key={index} className="border border-gray-500 rounded-lg p-4 hover:border-gray-400 transition-colors">
                <h2 className="text-xl font-semibold text-blue-200 mb-2">
                  <a href={result.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                    {result.title}
                    <ExternalLink className="ml-2" size={16} />
                  </a>
                </h2>
                <p className="text-gray-300 mb-2">{result.snippet}</p>
                <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center">
                  <Globe className="mr-1" size={16} />
                  Visit site
                </a>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'related' && (
          <div className="space-y-4">
            {relatedQuestions.map((question, index) => (
              <div key={index} className="border border-gray-500 rounded-lg p-4">
                <h2 className="text-xl font-semibold text-blue-200 mb-2">{question.question}</h2>
                {question.snippet && <p className="text-gray-300">{question.snippet}</p>}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'searches' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedSearches.map((search, index) => (
              <a
                key={index}
                href={search.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 p-4 rounded-lg hover:bg-gray-500 transition-colors flex items-center justify-between"
              >
                <span className="text-blue-300">{search.query}</span>
                <Search className="text-gray-300" size={20} />
              </a>
            ))}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <div key={index} className="border border-gray-500 rounded-lg p-4 hover:border-gray-400 transition-colors">
                <h2 className="text-xl font-semibold text-blue-200 mb-2">
                  <a href={video.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                    {video.title}
                    <ExternalLink className="ml-2" size={16} />
                  </a>
                </h2>
                <span className="inline-block bg-gray-600 text-gray-300 px-2 py-1 rounded-full text-sm mb-2">
                  {video.duration}
                </span>
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-300 hover:underline mt-2 inline-flex items-center"
                >
                  <Youtube className="mr-1" size={16} />
                  Watch on YouTube
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


const Page = ({ params }) => {
  const topic = decodeURIComponent(params?.exploreId);
  
  // For demonstration purposes, we're using the mockResponse.
  // In a real application, you'd fetch the data based on the topic.
  return <AIFuturisticSearchResults data={mockResponse} />;
};

export default Page;