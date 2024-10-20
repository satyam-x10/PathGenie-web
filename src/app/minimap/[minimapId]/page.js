'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import MiniFlowChart from '@/app/rm/MiniFlowChart';
const ReactFlow = dynamic(() => import('reactflow'), { ssr: false });

const Page = ({ params }) => {
  const minimapId = params.minimapId;
  const [tree, setTree] = useState([
    {
        "_id": "67149052ebf16f2df08b67ef",
        "topic": "Pet Care and Bonding",
        "parent": null,
        "children": [
            "67149052ebf16f2df08b67f0",
            "67149052ebf16f2df08b67f9",
            "67149052ebf16f2df08b6806",
            "67149052ebf16f2df08b6812",
            "67149052ebf16f2df08b681f"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67f0",
        "topic": "Petting Techniques",
        "parent": "67149052ebf16f2df08b67ef",
        "children": [
            "67149052ebf16f2df08b67f1",
            "67149052ebf16f2df08b67f5",
            "67149052ebf16f2df08b67f1",
            "67149052ebf16f2df08b67f5"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67f1",
        "topic": "Basics",
        "parent": "67149052ebf16f2df08b67f0",
        "children": [
            "67149052ebf16f2df08b67f2",
            "67149052ebf16f2df08b67f3",
            "67149052ebf16f2df08b67f4",
            "67149052ebf16f2df08b67f2",
            "67149052ebf16f2df08b67f3",
            "67149052ebf16f2df08b67f4",
            "67149052ebf16f2df08b67f2",
            "67149052ebf16f2df08b67f3",
            "67149052ebf16f2df08b67f4",
            "67149052ebf16f2df08b67f2",
            "67149052ebf16f2df08b67f3",
            "67149052ebf16f2df08b67f4"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67f2",
        "topic": "Gentleness",
        "parent": "67149052ebf16f2df08b67f1",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67f3",
        "topic": "Respecting Boundaries",
        "parent": "67149052ebf16f2df08b67f1",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67f4",
        "topic": "Reading Body Language",
        "parent": "67149052ebf16f2df08b67f1",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67f5",
        "topic": "Types of Pets",
        "parent": "67149052ebf16f2df08b67f0",
        "children": [
            "67149052ebf16f2df08b67f6",
            "67149052ebf16f2df08b67f7",
            "67149052ebf16f2df08b67f8",
            "67149052ebf16f2df08b67f6",
            "67149052ebf16f2df08b67f7",
            "67149052ebf16f2df08b67f8",
            "67149052ebf16f2df08b67f6",
            "67149052ebf16f2df08b67f7",
            "67149052ebf16f2df08b67f8",
            "67149052ebf16f2df08b67f6",
            "67149052ebf16f2df08b67f7",
            "67149052ebf16f2df08b67f8"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67f6",
        "topic": "Dogs",
        "parent": "67149052ebf16f2df08b67f5",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67f7",
        "topic": "Cats",
        "parent": "67149052ebf16f2df08b67f5",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67f8",
        "topic": "Other Pets",
        "parent": "67149052ebf16f2df08b67f5",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67f9",
        "topic": "Feeding",
        "parent": "67149052ebf16f2df08b67ef",
        "children": [
            "67149052ebf16f2df08b67fa",
            "67149052ebf16f2df08b67fe",
            "67149052ebf16f2df08b6802",
            "67149052ebf16f2df08b67fa",
            "67149052ebf16f2df08b67fe",
            "67149052ebf16f2df08b6802"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67fa",
        "topic": "Nutritional Needs",
        "parent": "67149052ebf16f2df08b67f9",
        "children": [
            "67149052ebf16f2df08b67fb",
            "67149052ebf16f2df08b67fc",
            "67149052ebf16f2df08b67fd",
            "67149052ebf16f2df08b67fb",
            "67149052ebf16f2df08b67fc",
            "67149052ebf16f2df08b67fd",
            "67149052ebf16f2df08b67fb",
            "67149052ebf16f2df08b67fc",
            "67149052ebf16f2df08b67fd",
            "67149052ebf16f2df08b67fb",
            "67149052ebf16f2df08b67fc",
            "67149052ebf16f2df08b67fd"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67fb",
        "topic": "Species-Appropriate Diet",
        "parent": "67149052ebf16f2df08b67fa",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67fc",
        "topic": "Age-Appropriate Portions",
        "parent": "67149052ebf16f2df08b67fa",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67fd",
        "topic": "Dietary Restrictions",
        "parent": "67149052ebf16f2df08b67fa",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67fe",
        "topic": "Meal Frequency and Timing",
        "parent": "67149052ebf16f2df08b67f9",
        "children": [
            "67149052ebf16f2df08b67ff",
            "67149052ebf16f2df08b6800",
            "67149052ebf16f2df08b6801",
            "67149052ebf16f2df08b67ff",
            "67149052ebf16f2df08b6800",
            "67149052ebf16f2df08b6801",
            "67149052ebf16f2df08b67ff",
            "67149052ebf16f2df08b6800",
            "67149052ebf16f2df08b6801",
            "67149052ebf16f2df08b67ff",
            "67149052ebf16f2df08b6800",
            "67149052ebf16f2df08b6801"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b67ff",
        "topic": "Regularity",
        "parent": "67149052ebf16f2df08b67fe",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6800",
        "topic": "Portions",
        "parent": "67149052ebf16f2df08b67fe",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6801",
        "topic": "Mealtimes",
        "parent": "67149052ebf16f2df08b67fe",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6802",
        "topic": "Food Safety",
        "parent": "67149052ebf16f2df08b67f9",
        "children": [
            "67149052ebf16f2df08b6803",
            "67149052ebf16f2df08b6804",
            "67149052ebf16f2df08b6805",
            "67149052ebf16f2df08b6803",
            "67149052ebf16f2df08b6804",
            "67149052ebf16f2df08b6805",
            "67149052ebf16f2df08b6803",
            "67149052ebf16f2df08b6804",
            "67149052ebf16f2df08b6805",
            "67149052ebf16f2df08b6803",
            "67149052ebf16f2df08b6804",
            "67149052ebf16f2df08b6805"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6803",
        "topic": "Freshness",
        "parent": "67149052ebf16f2df08b6802",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6804",
        "topic": "Storage",
        "parent": "67149052ebf16f2df08b6802",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6805",
        "topic": "Preventing Contamination",
        "parent": "67149052ebf16f2df08b6802",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6806",
        "topic": "Grooming",
        "parent": "67149052ebf16f2df08b67ef",
        "children": [
            "67149052ebf16f2df08b6807",
            "67149052ebf16f2df08b680b",
            "67149052ebf16f2df08b680f",
            "67149052ebf16f2df08b6807",
            "67149052ebf16f2df08b680b",
            "67149052ebf16f2df08b680f"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6807",
        "topic": "Hygiene",
        "parent": "67149052ebf16f2df08b6806",
        "children": [
            "67149052ebf16f2df08b6808",
            "67149052ebf16f2df08b6809",
            "67149052ebf16f2df08b680a",
            "67149052ebf16f2df08b6808",
            "67149052ebf16f2df08b6809",
            "67149052ebf16f2df08b680a",
            "67149052ebf16f2df08b6808",
            "67149052ebf16f2df08b6809",
            "67149052ebf16f2df08b680a",
            "67149052ebf16f2df08b6808",
            "67149052ebf16f2df08b6809",
            "67149052ebf16f2df08b680a"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6808",
        "topic": "Bathing",
        "parent": "67149052ebf16f2df08b6807",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6809",
        "topic": "Brushing",
        "parent": "67149052ebf16f2df08b6807",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b680a",
        "topic": "Nail Trimming",
        "parent": "67149052ebf16f2df08b6807",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b680b",
        "topic": "Coat Care",
        "parent": "67149052ebf16f2df08b6806",
        "children": [
            "67149052ebf16f2df08b680c",
            "67149052ebf16f2df08b680d",
            "67149052ebf16f2df08b680e",
            "67149052ebf16f2df08b680c",
            "67149052ebf16f2df08b680d",
            "67149052ebf16f2df08b680e",
            "67149052ebf16f2df08b680c",
            "67149052ebf16f2df08b680d",
            "67149052ebf16f2df08b680e",
            "67149052ebf16f2df08b680c",
            "67149052ebf16f2df08b680d",
            "67149052ebf16f2df08b680e"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b680c",
        "topic": "Long-haired Pets",
        "parent": "67149052ebf16f2df08b680b",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b680d",
        "topic": "Short-haired Pets",
        "parent": "67149052ebf16f2df08b680b",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b680e",
        "topic": "Skin Care",
        "parent": "67149052ebf16f2df08b680b",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b680f",
        "topic": "Dental Care",
        "parent": "67149052ebf16f2df08b6806",
        "children": [
            "67149052ebf16f2df08b6809",
            "67149052ebf16f2df08b6810",
            "67149052ebf16f2df08b6811",
            "67149052ebf16f2df08b6809",
            "67149052ebf16f2df08b6810",
            "67149052ebf16f2df08b6811",
            "67149052ebf16f2df08b6809",
            "67149052ebf16f2df08b6810",
            "67149052ebf16f2df08b6811",
            "67149052ebf16f2df08b6809",
            "67149052ebf16f2df08b6810",
            "67149052ebf16f2df08b6811"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6810",
        "topic": "Dental Chews",
        "parent": "67149052ebf16f2df08b680f",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6811",
        "topic": "Professional Cleanings",
        "parent": "67149052ebf16f2df08b680f",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6812",
        "topic": "Ensuring Well-being",
        "parent": "67149052ebf16f2df08b67ef",
        "children": [
            "67149052ebf16f2df08b6813",
            "67149052ebf16f2df08b6817",
            "67149052ebf16f2df08b681b",
            "67149052ebf16f2df08b6813",
            "67149052ebf16f2df08b6817",
            "67149052ebf16f2df08b681b"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6813",
        "topic": "Physical Health",
        "parent": "67149052ebf16f2df08b6812",
        "children": [
            "67149052ebf16f2df08b6814",
            "67149052ebf16f2df08b6815",
            "67149052ebf16f2df08b6816",
            "67149052ebf16f2df08b6814",
            "67149052ebf16f2df08b6815",
            "67149052ebf16f2df08b6816",
            "67149052ebf16f2df08b6814",
            "67149052ebf16f2df08b6815",
            "67149052ebf16f2df08b6816",
            "67149052ebf16f2df08b6814",
            "67149052ebf16f2df08b6815",
            "67149052ebf16f2df08b6816"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6814",
        "topic": "Veterinary Care",
        "parent": "67149052ebf16f2df08b6813",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6815",
        "topic": "Exercise",
        "parent": "67149052ebf16f2df08b6813",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6816",
        "topic": "Preventive Measures",
        "parent": "67149052ebf16f2df08b6813",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6817",
        "topic": "Mental Health",
        "parent": "67149052ebf16f2df08b6812",
        "children": [
            "67149052ebf16f2df08b6818",
            "67149052ebf16f2df08b6819",
            "67149052ebf16f2df08b681a",
            "67149052ebf16f2df08b6818",
            "67149052ebf16f2df08b6819",
            "67149052ebf16f2df08b681a",
            "67149052ebf16f2df08b6818",
            "67149052ebf16f2df08b6819",
            "67149052ebf16f2df08b681a",
            "67149052ebf16f2df08b6818",
            "67149052ebf16f2df08b6819",
            "67149052ebf16f2df08b681a"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6818",
        "topic": "Play and Stimulation",
        "parent": "67149052ebf16f2df08b6817",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6819",
        "topic": "Affection and Bonding",
        "parent": "67149052ebf16f2df08b6817",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b681a",
        "topic": "Managing Anxiety",
        "parent": "67149052ebf16f2df08b6817",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b681b",
        "topic": "Socialization and Training",
        "parent": "67149052ebf16f2df08b6812",
        "children": [
            "67149052ebf16f2df08b681c",
            "67149052ebf16f2df08b681d",
            "67149052ebf16f2df08b681e",
            "67149052ebf16f2df08b681c",
            "67149052ebf16f2df08b681d",
            "67149052ebf16f2df08b681e",
            "67149052ebf16f2df08b681c",
            "67149052ebf16f2df08b681d",
            "67149052ebf16f2df08b681e",
            "67149052ebf16f2df08b681c",
            "67149052ebf16f2df08b681d",
            "67149052ebf16f2df08b681e"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b681c",
        "topic": "Early Socialization",
        "parent": "67149052ebf16f2df08b681b",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b681d",
        "topic": "Training and Discipline",
        "parent": "67149052ebf16f2df08b681b",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b681e",
        "topic": "Positive Reinforcement",
        "parent": "67149052ebf16f2df08b681b",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b681f",
        "topic": "Building a Loving Bond",
        "parent": "67149052ebf16f2df08b67ef",
        "children": [
            "67149052ebf16f2df08b6820",
            "67149052ebf16f2df08b6824",
            "67149052ebf16f2df08b6828",
            "67149052ebf16f2df08b6820",
            "67149052ebf16f2df08b6824",
            "67149052ebf16f2df08b6828"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6820",
        "topic": "Respect and Understanding",
        "parent": "67149052ebf16f2df08b681f",
        "children": [
            "67149052ebf16f2df08b6821",
            "67149052ebf16f2df08b6822",
            "67149052ebf16f2df08b6823",
            "67149052ebf16f2df08b6821",
            "67149052ebf16f2df08b6822",
            "67149052ebf16f2df08b6823",
            "67149052ebf16f2df08b6821",
            "67149052ebf16f2df08b6822",
            "67149052ebf16f2df08b6823",
            "67149052ebf16f2df08b6821",
            "67149052ebf16f2df08b6822",
            "67149052ebf16f2df08b6823"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6821",
        "topic": "Pet's Perspective",
        "parent": "67149052ebf16f2df08b6820",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6822",
        "topic": "Communication and Cues",
        "parent": "67149052ebf16f2df08b6820",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6823",
        "topic": "Patience and Consistency",
        "parent": "67149052ebf16f2df08b6820",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6824",
        "topic": "Quality Time",
        "parent": "67149052ebf16f2df08b681f",
        "children": [
            "67149052ebf16f2df08b6825",
            "67149052ebf16f2df08b6826",
            "67149052ebf16f2df08b6827",
            "67149052ebf16f2df08b6825",
            "67149052ebf16f2df08b6826",
            "67149052ebf16f2df08b6827",
            "67149052ebf16f2df08b6825",
            "67149052ebf16f2df08b6826",
            "67149052ebf16f2df08b6827",
            "67149052ebf16f2df08b6825",
            "67149052ebf16f2df08b6826",
            "67149052ebf16f2df08b6827"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6825",
        "topic": "Play and Activities",
        "parent": "67149052ebf16f2df08b6824",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6826",
        "topic": "Cuddling and Affection",
        "parent": "67149052ebf16f2df08b6824",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6827",
        "topic": "Enrichment",
        "parent": "67149052ebf16f2df08b6824",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6828",
        "topic": "Creating a Safe and Loving Environment",
        "parent": "67149052ebf16f2df08b681f",
        "children": [
            "67149052ebf16f2df08b6829",
            "67149052ebf16f2df08b682a",
            "67149052ebf16f2df08b682b",
            "67149052ebf16f2df08b6829",
            "67149052ebf16f2df08b682a",
            "67149052ebf16f2df08b682b",
            "67149052ebf16f2df08b6829",
            "67149052ebf16f2df08b682a",
            "67149052ebf16f2df08b682b",
            "67149052ebf16f2df08b6829",
            "67149052ebf16f2df08b682a",
            "67149052ebf16f2df08b682b"
        ],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b6829",
        "topic": "Comfortable and Clean Living Space",
        "parent": "67149052ebf16f2df08b6828",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b682a",
        "topic": "Safe and Secure Boundaries",
        "parent": "67149052ebf16f2df08b6828",
        "children": [],
        "__v": 0
    },
    {
        "_id": "67149052ebf16f2df08b682b",
        "topic": "Emotional Support",
        "parent": "67149052ebf16f2df08b6828",
        "children": [],
        "__v": 0
    }
]);
 
  // useEffect(() => {
  //   const fetchTree = async () => {
  //     try {
  //       // const response = await axios.get(`/api/tree?minimapId=${minimapId}`);
  //       // const treeData = response.data.data;
  //       // console.log('Tree data:', treeData);

  //       // setTree(treeData);
  //       generateFlowchartData(tree); // Generate nodes and edges from tree data
  //     } catch (error) {
  //       console.error('Error fetching tree data:', error);
  //     }
  //   };

  //   fetchTree();
  // }, [minimapId]);


  return (
    <div>
      <h1>Tree Structure</h1>
      {tree.length>0 ? (
        <div style={{ height: '100vh', width: '100%' }}>
          <MiniFlowChart tree ={tree}/>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
