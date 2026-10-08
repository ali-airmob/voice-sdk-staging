import * as React from "react";

/**
 * Unified events triggered during the voice call lifecycle.
 * Use these events to trigger layout updates, avatars, visualizers, or custom telemetry.
 */
export type VoiceAIEventType =
  /** Triggered when the call setup starts (before connections are initialized). Excellent for showing a loading spinner. */
  | "call.connecting"
  /** Triggered when the connection is established and the agent is ready. Perfect for transitioning your UI to 'Active Call' state. */
  | "call.connected"
  /** Triggered when the call termination sequence begins. */
  | "call.disconnecting"
  /** Triggered when the session is completely closed and all resources (microphone, audio context) are cleaned up. */
  | "call.disconnected"
  /** Triggered when a connection, session, or tool execution error occurs. */
  | "call.error"
  /** Triggered immediately when the agent starts calling a tool function, before the client execute callback runs. Useful for showing loading states inside custom UI overlays. */
  | "tool.executing"
  /** Triggered once the client execute callback finishes and returns the payload to the agent. */
  | "tool.executed"
  /** Triggered if a tool execution fails or if the requested tool does not exist. */
  | "tool.error"
  /** Triggered when the Text Chat agent starts generating a response. */
  | "chat.generating"
  /** Triggered when the Text Chat agent successfully finishes streaming a response. */
  | "chat.generated"
  /** Triggered if the Text Chat stream encounters an error. */
  | "chat.error";

export interface VoiceAIOptions {
  /**
   * The API Key generated from the Voice AI Developer Console.
   * @example "86cf25e9c28fac5ccf751d6498ed9a3b8f00545..."
   */
  apiKey: string;

  /**
   * The unique Application Identifier for your agent.
   * @example "74240d1ec682e505"
   */
  appId: string;

  /**
   * Callback triggered when initialization fails or a session error occurs.
   * @example
   * onError: (error) => {
   *   console.error("SDK Error:", error.message);
   * }
   */
  onError?: (err: any) => void;

  /**
   * Unified callback to listen to Agent connection states, errors, and tool executions.
   * @example
   * onEvent: (type, data) => {
   *   // type: "call.connecting" | "call.connected" | "call.disconnecting" | "call.disconnected" | "call.error" | "tool.executed"
   *   console.log("Event:", type, data);
   * }
   */
  onEvent?: (type: VoiceAIEventType, data: any) => void;
}

export interface VoiceAITool {
  /**
   * Must always be "function".
   */
  type: "function";

  /**
   * The unique name of the custom tool. Must match what the Agent will call.
   * Only alphanumeric characters and underscores are allowed.
   * @example "change_color"
   */
  name: string;

  /**
   * A clear explanation of what the tool does and when the Agent should trigger it.
   * @example "Changes the background color of the UI container."
   */
  description: string;

  /**
   * The strict JSON schema defining the arguments the Agent must supply.
   * @example
   * parameters: {
   *   type: "object",
   *   properties: {
   *     colorHex: { type: "string", description: "CSS Hex code" }
   *   },
   *   required: ["colorHex"]
   * }
   */
  parameters: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
    [key: string]: any;
  };

  /**
   * The function executed on the client-side when the Agent calls this tool.
   * Can be synchronous or asynchronous.
   * @example
   * execute: (args) => {
   *   setThemeColor(args.colorHex);
   *   return { success: true, message: "Color was changed" };
   * }
   */
  execute: (args: any) => any | Promise<any>;
}

export type VoiceAIButtonProps =
  | {
      /**
       * Renders the widget as a floating action pill.
       */
      buttonType?: "pill";
      /**
       * URL or path to a custom logo image.
       */
      logo?: string;
      /**
       * Background color of the pill button.
       */
      buttonColor?: string;
      /**
       * Background color of the container wrapper.
       */
      wrapperColor?: string;
      /**
       * Text color inside the button.
       */
      textColor?: string;
      /**
       * Loading spinner color.
       */
      loaderColor?: string;
      /**
       * List of custom tools exposed to this button session.
       */
      tools?: VoiceAITool[];
      /**
       * Custom instruction or state payload injected once when the call connects.
       *
       * Note: This is injected as system context, does not trigger a verbal response from the agent,
       * runs once per session startup, and cannot be changed dynamically during an active call.
       * @example "Current user details are: Alice | Cart items: laptop, headphones | Status: VIP member"
       */
      initialContext?: string;
      /**
       * (Optional) Enable or disable IndexedDB background memory. Defaults to true.
       * If false, the Agent will completely forget the user when the page reloads.
       * Set to false if you want the widget to be entirely stateless between sessions.
       */
      enableMemory?: boolean;
      /**
       * (Optional) The maximum number of past messages to pull from memory and send to the Agent.
       * Lower this number to optimize performance and reduce latency. Defaults to "all".
       * @example 20
       */
      memoryRetentionLimit?: number | "all";
      /**
       * (Optional) A custom namespace key for the IndexedDB storage.
       * If multiple widgets on the same domain share this namespace, they will share the same memory!
       * @example "my_global_store_memory"
       */
      memoryNamespace?: string;
    }
  | {
      /**
       * Renders the widget as an interactive bottom card.
       */
      buttonType: "widget";
      /**
       * URL or path to a custom logo image.
       */
      logo?: string;
      /**
       * Header title text inside the widget window.
       */
      title?: string;
      /**
       * List of custom tools exposed to this button session.
       */
      tools?: VoiceAITool[];
      /**
       * Custom instruction or state payload injected once when the call connects.
       *
       * Note: This is injected as system context, does not trigger a verbal response from the agent,
       * runs once per session startup, and cannot be changed dynamically during an active call.
       * @example "Current user details are: Alice | Cart items: laptop, headphones | Status: VIP member"
       */
      initialContext?: string;
      /**
       * (Optional) Enable or disable IndexedDB background memory. Defaults to true.
       * If false, the Agent will completely forget the user when the page reloads.
       * Set to false if you want the widget to be entirely stateless between sessions.
       */
      enableMemory?: boolean;
      /**
       * (Optional) The maximum number of past messages to pull from memory and send to the Agent.
       * Lower this number to optimize performance and reduce latency. Defaults to "all".
       * @example 20
       */
      memoryRetentionLimit?: number | "all";
      /**
       * (Optional) A custom namespace key for the IndexedDB storage.
       * If multiple widgets on the same domain share this namespace, they will share the same memory!
       * @example "my_global_store_memory"
       */
      memoryNamespace?: string;
    }
  | {
      /**
       * Renders the full unified text + voice chatbot widget.
       * Combines a persistent chat interface with an embedded real-time voice session.
       */
      buttonType: "unified";
      /**
       * Header title shown in the chatbot widget window.
       * @example "Airomob Support"
       */
      title?: string;
      /**
       * Subtitle or status label shown below the title.
       * @example "Neural Copilot Active"
       */
      subtitle?: string;
      /**
       * List of custom tools exposed to the unified session (available for both text and voice).
       */
      tools?: VoiceAITool[];
      /**
       * Custom instruction or state payload injected once when the session connects.
       *
       * Note: This is injected as system context, does not trigger a verbal response from the agent,
       * runs once per session startup, and cannot be changed dynamically during an active call.
       * @example "VIP Customer: John Doe | Membership Level: Gold | Preferred Language: English"
       */
      initialContext?: string;
      /**
       * (Optional) Enable or disable IndexedDB background memory. Defaults to true.
       * If false, the Agent will completely forget the user when the page reloads.
       * Set to false if you want the widget to be entirely stateless between sessions.
       */
      enableMemory?: boolean;
      /**
       * (Optional) The maximum number of past messages to pull from memory and send to the Agent.
       * Lower this number to optimize performance and reduce latency. Defaults to "all".
       * @example 20
       */
      memoryRetentionLimit?: number | "all";
      /**
       * (Optional) A custom namespace key for the IndexedDB storage.
       * If multiple widgets on the same domain share this namespace, they will share the same memory!
       * @example "my_global_store_memory"
       */
      memoryNamespace?: string;
    };

/**
 * Root Provider wrapper component. Connects to the Voice agent.
 * Must wrap the root of your application (or a high-level parent layout component)
 * that contains any `<VoiceAIButton />`.
 *
 * @example
 * <VoiceToolkit apiKey="YOUR_KEY" appId="YOUR_APP_ID">
 *   <App />
 * </VoiceToolkit>
 */
export const VoiceToolkit: React.FC<React.PropsWithChildren<VoiceAIOptions>>;

/**
 * Interactive widget that renders the Voice agent session or the unified chatbot.
 * Place this component high up in your React component tree so the session survives page transitions.
 *
 * @example — Voice pill button
 * <VoiceAIButton buttonType="pill" tools={[myTool]} />
 *
 * @example — Voice widget
 * <VoiceAIButton buttonType="widget" title="Support Agent" tools={[myTool]} />
 *
 * @example — Unified text + voice chatbot
 * <VoiceAIButton
 *   buttonType="unified"
 *   title="Airomob Support"
 *   subtitle="Neural Copilot Active"
 *   tools={[myTool]}
 *   initialContext="VIP Customer: John Doe | Membership Level: Gold"
 * />
 */
export const VoiceAIButton: React.FC<VoiceAIButtonProps>;
