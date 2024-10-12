import FlowchartViewer from '../../../components/FlowChart'
import React from 'react'
import ImproviseChat from '../../../components/ImproviseChat'

const Topics = ({ params }) => {
  const taskId = params?.taskId
  const improviseTaskId = "2"
  return (
    <div className="flex h-screen bg-gray-900">
      {/* MiniMapDiagram occupying 60% */}
      <div className="w-3/5 p-4">
        <FlowchartViewer taskId={taskId || "1"} />
      </div>
    <ImproviseChat taskId={improviseTaskId} />
    </div>
  )
}

export default Topics
