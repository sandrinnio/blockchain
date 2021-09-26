import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Block from "./Block";

function Blocks() {
  const [blocks, setBlocks] = useState([]);
  const [paginatedId, setPaginatedId] = useState(1);
  const [blocksLength, setBlocksLength] = useState(0);

  useEffect(() => {
    fetch(`${document.location.origin}/api/blocks/length`)
      .then((response) => response.json())
      .then((data) => setBlocksLength(data));

    fetchPaginatedBlocks(paginatedId);
  }, []);

  const fetchPaginatedBlocks = (id) => {
    fetch(`${document.location.origin}/api/blocks/${id}`)
      .then((response) => response.json())
      .then((data) => setBlocks(data));
  };

  return (
    <div>
      <div>
        <a href="/">Home</a>
      </div>
      <h3>Blocks</h3>
      <div>
        {[...Array(Math.ceil(blocksLength / 5)).keys()].map((key) => {
          const paginatedKey = key + 1;

          return (
            <span key={key} onClick={() => fetchPaginatedBlocks(paginatedKey)}>
              <Button>{paginatedKey}</Button>
            </span>
          );
        })}
      </div>
      {blocks.map((block) => (
        <Block key={block.hash} {...block} />
      ))}
    </div>
  );
}

export default Blocks;
