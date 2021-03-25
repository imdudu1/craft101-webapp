import React from 'react';

interface Props {
  title: string;
  explanation: string;
  discord: string;
  homepage: string;
}

const ServerButton: React.FC<Props> = ({
  title,
  explanation,
  discord,
  homepage,
}) => (
  <div className="grid grid-cols-12 p-4 shadow-sm rounded-full bg-white border">
    <img
      className="col-span-3 bg-blue-300 rounded-full h-24 w-24 overflow-hidden"
      src="https://i.pinimg.com/originals/95/fa/9c/95fa9cb924c0dd8220e1dd6d760cdbe4.jpg"
      alt="thumbnail"
    />
    <div className="max-h-full col-span-9 mx-3 flex flex-col justify-between">
      <div className="flex flex-col">
        <p className="font-sans-kr text-xl mb-1">{title}</p>
        <p className="max-h-8 font-sans-kr text-xs text-gray-600 overflow-hidden">
          {explanation}
        </p>
      </div>
      <div className="flex flex-row">
        <a className="hover:no-underline" href={discord}>
          <img
            className="w-5 h-5 mr-2"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgcm9sZT0iaW1nIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlLz48cGF0aCBkPSJNMjAuMjIyIDBjMS40MDYgMCAyLjU0IDEuMTM3IDIuNjA3IDIuNDc1VjI0bC0yLjY3Ny0yLjI3My0xLjQ3LTEuMzM4LTEuNjA0LTEuMzk4LjY3IDIuMjA1SDMuNzFjLTEuNDAyIDAtMi41NC0xLjA2NS0yLjU0LTIuNDc2VjIuNDhDMS4xNyAxLjE0MiAyLjMxLjAwMyAzLjcxNS4wMDNoMTYuNUwyMC4yMjIgMHptLTYuMTE4IDUuNjgzaC0uMDNsLS4yMDIuMmMyLjA3My42IDMuMDc2IDEuNTM3IDMuMDc2IDEuNTM3LTEuMzM2LS42NjgtMi41NC0xLjAwMi0zLjc0NC0xLjEzNy0uODctLjEzNS0xLjc0LS4wNjQtMi40NzUgMGgtLjJjLS40NyAwLTEuNDcuMi0yLjgxLjczNS0uNDY3LjIwMy0uNzM1LjMzNi0uNzM1LjMzNnMxLjAwMi0xLjAwMiAzLjIxLTEuNTM3bC0uMTM1LS4xMzVzLTEuNjcyLS4wNjQtMy40NzcgMS4yN2MwIDAtMS44MDUgMy4xNDQtMS44MDUgNy4wMiAwIDAgMSAxLjc0IDMuNzQzIDEuODA2IDAgMCAuNC0uNTMzLjgwNS0xLjAwMi0xLjU0LS40NjgtMi4xNC0xLjQwNC0yLjE0LTEuNDA0cy4xMzQuMDY2LjMzNS4yaC4wNmMuMDMgMCAuMDQ0LjAxNS4wNi4wM3YuMDA2Yy4wMTYuMDE2LjAzLjAzLjA2LjAzLjMzLjEzNi42Ni4yNy45My40LjQ2Ni4yMDIgMS4wNjUuNDAzIDEuOC41MzYuOTMuMTM1IDEuOTk2LjIgMy4yMSAwIC42LS4xMzUgMS4yLS4yNjcgMS44LS41MzUuMzktLjIuODctLjQgMS4zOTctLjczNyAwIDAtLjYuOTM2LTIuMjA1IDEuNDA0LjMzLjQ2Ni43OTUgMSAuNzk1IDEgMi43NDQtLjA2IDMuODEtMS44IDMuODctMS43MjYgMC0zLjg3LTEuODE1LTcuMDItMS44MTUtNy4wMi0xLjYzNS0xLjIxNC0zLjE2NS0xLjI2LTMuNDM1LTEuMjZsLjA1Ni0uMDJ6bS4xNjggNC40MTNjLjcwMyAwIDEuMjcuNiAxLjI3IDEuMzM1IDAgLjc0LS41NyAxLjM0LTEuMjcgMS4zNC0uNyAwLTEuMjctLjYtMS4yNy0xLjMzNC4wMDItLjc0LjU3My0xLjMzOCAxLjI3LTEuMzM4em0tNC41NDMgMGMuNyAwIDEuMjY2LjYgMS4yNjYgMS4zMzUgMCAuNzQtLjU3IDEuMzQtMS4yNyAxLjM0LS43IDAtMS4yNy0uNi0xLjI3LTEuMzM0IDAtLjc0LjU3LTEuMzM4IDEuMjctMS4zMzh6Ii8+PC9zdmc+"
            alt="discord"
          />
        </a>
        <a className="hover:no-underline" href={homepage}>
          <img
            className="w-5 h-5"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQ7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGcgaWQ9ImluZm8iLz48ZyBpZD0iaWNvbnMiPjxwYXRoIGQ9Ik0yMy42LDEwLjNMMTMuMiwyLjRjLTAuNy0wLjUtMS43LTAuNS0yLjUsMEwwLjQsMTAuM0MtMC40LDEwLjksMCwxMiwxLDEyaDF2Ni4xQzIsMjAuMiwzLjgsMjIsNiwyMmgyICAgYzAuNiwwLDEtMC40LDEtMXYtNC45QzksMTUsOS45LDE0LDExLDE0aDJjMS4xLDAsMiwxLDIsMi4xVjIxYzAsMC41LDAuNCwxLDEsMWgyYzIuMiwwLDQtMS44LDQtMy45VjEyaDEgICBDMjMuOSwxMiwyNC4zLDEwLjksMjMuNiwxMC4zeiIgaWQ9ImhvbWUiLz48L2c+PC9zdmc+"
            alt="homepage"
          />
        </a>
      </div>
    </div>
  </div>
);

export default ServerButton;
