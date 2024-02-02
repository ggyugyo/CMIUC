import React, { useEffect, useState } from "react";
import axios from "axios";

function Win() {
  return <div></div>;
}

export default Win;

function DFS() {
  let visited = new Array(9).fill(false);
  let result = [];

  function dfs(v) {
    visited[v] = true;
    result.push(v);
    for (let i = 0; i < graph[v].length; i++) {
      if (!visited[graph[v][i]]) {
        dfs(graph[v][i]);
      }
    }
  }

  dfs(1);
  console.log(result);
}
