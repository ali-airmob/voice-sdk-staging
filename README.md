# Airomob Voice Toolkit AI SDK — Staging

Staging build of the [Airomob](https://airomob.com) Voice AI SDK, the embeddable voice and chat widget for React apps.

> **SDK version 1.** Each tool's description and parameters live in the website's code. Version 2 keeps only the tool name and function in code, and is installed with `#v2.0.0`.

> **Staging build.** For testing integrations and early features. Production sites should use the production SDK instead: [`airomobdxb/voicesdk`](https://github.com/airomobdxb/voicesdk).

## Install

Pin a version tag so you don't pick up an unfinished build:

```bash
npm install https://github.com/ali-airmob/voice-sdk-staging.git#v1.0.0
```

The package name is the same as production (`vtk-voice-ai-sdk`), so switching between staging and production only means changing the install URL, not your imports.

Requires React 18 or 19.

## Usage

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { VoiceToolkit, VoiceAIButton } from "vtk-voice-ai-sdk";
import "vtk-voice-ai-sdk/dist/style.css"; // required styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <VoiceToolkit appId="YOUR_APP_ID" apiKey="YOUR_API_KEY">
    <VoiceAIButton buttonType="widget" title="Support Agent" />
  </VoiceToolkit>
);
```

Use an App ID and API key created in the **staging** dashboard. Production credentials will not work here.

Full option and event types are in `dist/index.d.ts`.

## Contents

| File | Purpose |
|---|---|
| `dist/voice-ai.js` | ES module build |
| `dist/style.css` | Widget styles |
| `dist/index.d.ts` | TypeScript types |

## Contact

- Website: https://airomob.com
- Support: info@airomob.com
