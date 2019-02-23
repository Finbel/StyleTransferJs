import React from "react";
import {
  InteractiveForceGraph,
  ForceGraphNode,
  ForceGraphLink
} from "react-vis-force";
import { interpolateSpectral } from "d3-scale-chromatic";

const VectorGraph = props => {
  const { network, onSelect } = props;
  const { nodes, links } = network;

  links.forEach(link => console.log(link.source + link.target));

  return (
    <div className="graph">
      <InteractiveForceGraph
        selectedNode={undefined}
        showLabels={true}
        simulationOptions={{
          zoom: true,
          alpha: 1,
          radiusMargin: 30
        }}
        onSelectNode={(event, node) => onSelect(node.id)}
      >
        {nodes.map(node => (
          <ForceGraphNode
            key={node.id}
            node={{
              id: node.id,
              radius: 7
            }}
            fill={interpolateSpectral(
              nodes.length ? node.color / (nodes.length - 1) : 0
            )}
            className={node.explored ? "explored" : null}
          />
        ))}
        {links.map(link => (
          <ForceGraphLink key={link.key} link={link} />
        ))}
      </InteractiveForceGraph>
    </div>
  );
};

export default VectorGraph;
