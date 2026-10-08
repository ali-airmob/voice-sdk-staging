# Airomob Voice Toolkit AI SDK — Staging

Staging build of the [Airomob](https://airomob.com) Voice AI SDK, the embeddable voice and chat widget for React apps.

> **Staging build.** For testing integrations and early features. Production sites should use the production release instead: [`vtk-voice-ai-sdk` on npm](https://www.npmjs.com/package/vtk-voice-ai-sdk) (`npm install vtk-voice-ai-sdk`) or the [`airomobdxb/voicesdk`](https://github.com/airomobdxb/voicesdk) repository.

## Install

```bash
npm install vtk-voice-ai-sdk@staging
```

The `staging` tag always points at the newest staging build. To lock a specific build, install its exact version, for example `npm install vtk-voice-ai-sdk@2.0.0-staging.1`.

The package name is the same as production, so switching between staging and production only changes the install command, not your imports.

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

Use an App ID and API key created in the [**staging** dashboard](https://staging-portal.airomob.com). Production credentials will not work here.

Full option and event types are in `dist/index.d.ts`.

## Contact

- Website: https://airomob.com
- Support: info@airomob.com
