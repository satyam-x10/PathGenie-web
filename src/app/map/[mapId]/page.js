'use client'
import FlowchartViewer from "../../../components/FlowChart";
import React, { useEffect } from "react";
import ImproviseChat from "../../../components/ImproviseChat";

const Map = ({ params }) => {
  const minimapId = params?.mapId;
  console.log("minimapId:", minimapId);

  // Use a specific ID for the improvisation chat
  const improviseminimapId = "2";

  useEffect(() => {
    const fetchTopicData = async () => {
      if (minimapId) {
        try {
          const response = await fetch(`/api/topic?chainId=${minimapId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("API Response:", data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchTopicData();
  }, [minimapId]); // Dependency array includes minimapId

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-3/5 p-4">
        <FlowchartViewer minimapId={minimapId || "1"} />
      </div>
      <ImproviseChat minimapId={improviseminimapId} />
    </div>
  );
};

export default Map;
