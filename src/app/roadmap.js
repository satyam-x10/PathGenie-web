'use client';
import React, { useState } from 'react';
import { Book, Video, Image, FileText, Link, Tag, Flag } from 'lucide-react';
import data from '../public/structure.json';

const TaskComponent = () => {
  const [showReferences, setShowReferences] = useState(false);

  return (
    <><div className="w-full max-w-4xl mx-auto my-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg relative">
   
    <div className="flex flex-col space-y-4">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-lg font-semibold dark:text-white">{data.description}</h2>
          <div className="flex items-center mt-2 space-x-2">
            <Flag className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-500 capitalize">{data.priority}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 max-w-xs">
          {data.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-xs rounded-full text-blue-800 dark:text-blue-100">
              {tag}
            </span>
          ))}
        </div>
      </div>
  
      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Link className="w-4 h-4 mt-1 text-gray-500" />
            <div>
              <h3 className="text-sm font-medium dark:text-gray-200">Sub Topics</h3>
              <ul className="mt-1 space-y-1">
                {data.subTopics.map((topic) => (
                  <li key={topic} className="text-sm text-gray-600 dark:text-gray-300">• {topic}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Tag className="w-4 h-4 mt-1 text-gray-500" />
            <div>
              <h3 className="text-sm font-medium dark:text-gray-200">Categories</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.categories.map((category) => (
                  <span key={category} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-xs rounded-full text-purple-800 dark:text-purple-100">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        {/* Right Column */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Book className="w-4 h-4 mt-1 text-gray-500" />
            <div>
              <h3 className="text-sm font-medium dark:text-gray-200">Resources</h3>
              <ResourceList resources={data.resources} />
            </div>
          </div>
  
          <div className="flex items-start gap-2">
            <Link className="w-4 h-4 mt-1 text-gray-500" />
            <div>
              <h3 
                className="text-sm font-medium dark:text-gray-200 cursor-pointer"
                onClick={() => setShowReferences(!showReferences)}
              >
                References {showReferences ? '▼' : '►'}
              </h3>
              {showReferences && (
                <ul className="mt-1 space-y-1">
                  {data.references.map((ref, index) => (
                    <li key={index} className="text-sm">
                      <a href={ref} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                        {ref}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></>
    
  
  );
};

const ResourceList = ({ resources }) => (
  <div className="grid grid-cols-2 gap-2 mt-1">
    {Object.entries(resources).map(([type, items]) => (
      <div key={type} className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
        {type === 'images' && <Image className="w-3 h-3 text-blue-500" />}
        {type === 'videos' && <Video className="w-3 h-3 text-red-500" />}
        {type === 'articles' && <FileText className="w-3 h-3 text-green-500" />}
        {type === 'books' && <Book className="w-3 h-3 text-yellow-500" />}
        {type === 'tutorials' && <FileText className="w-3 h-3 text-purple-500" />}
        <span className="capitalize">{type}:</span>
        <span>{items.length}</span>
      </div>
    ))}
  </div>
);

export default TaskComponent;
