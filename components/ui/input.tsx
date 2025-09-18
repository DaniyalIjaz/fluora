"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  preventSpaces?: boolean;
  usePlacesAutocomplete?: boolean;
  onPlaceSelected?: (place: any) => void;
  inputMode?: "text" | "none" | "search" | "email" | "tel" | "url" | "numeric" | "decimal";
  isSlider?: boolean;
  maxBudget?: number;
  currentValue?: number;
  onSliderChange?: (value: number) => void;
  formatPhoneNumber?: boolean;
  readOnly?: boolean;
  // Google Picker props
  useGooglePicker?: boolean;
  onGoogleFileSelected?: (fileData: {
    url: string;
    name: string;
    id: string;
  }) => void;
  pickerButtonText?: string;
}

declare global {
  interface Window {
    google?: any;
    gapi?: any;
    initGooglePlacesAutocomplete?: () => void;
  }
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      usePlacesAutocomplete,
      useGooglePicker,
      onGoogleFileSelected,
      pickerButtonText = "Browse",
      ...props
    },
    ref
  ) => {
    // Google Picker API state
    const [pickerApiLoaded, setPickerApiLoaded] = React.useState(false);
    const [pickerInitialized, setPickerInitialized] = React.useState(false);
    const [oauthToken, setOauthToken] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Merge refs
    const mergedRef = React.useMemo(() => {
      if (ref) {
        return typeof ref === "function"
          ? (node: HTMLInputElement) => {
              ref(node);
              inputRef.current = node;
            }
          : {
              get current() {
                return ref.current;
              },
              set current(value) {
                ref.current = value;
                inputRef.current = value;
              },
            };
      }
      return inputRef;
    }, [ref]);

    // Load the Google Picker API
    const loadPickerApi = React.useCallback(() => {
      if (pickerApiLoaded) return;

      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = () => {
        window.gapi.load("picker", () => {
          setPickerApiLoaded(true);
        });
      };
      document.body.appendChild(script);
    }, [pickerApiLoaded]);

    // Initialize Google auth
    const initializeGoogleAuth = React.useCallback(() => {
      if (!window.gapi || pickerInitialized) return;

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = () => {
        window.google.accounts.oauth2.initTokenClient({
          client_id:
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
            "123456789-example.apps.googleusercontent.com",
          scope: "https://www.googleapis.com/auth/drive.file",
          callback: (tokenResponse: any) => {
            if (tokenResponse.access_token) {
              setOauthToken(tokenResponse.access_token);
              setPickerInitialized(true);
            }
          },
        });
      };
      document.body.appendChild(script);
    }, [pickerInitialized]);

    // Load APIs and open picker
    const loadAndOpenPicker = React.useCallback(() => {
      if (!pickerApiLoaded) {
        loadPickerApi();
        return;
      }

      if (!pickerInitialized) {
        initializeGoogleAuth();
        return;
      }

      createPicker();
    }, [
      pickerApiLoaded,
      pickerInitialized,
      loadPickerApi,
      initializeGoogleAuth,
    ]);

    // Create and open the Google Picker
    const createPicker = React.useCallback(() => {
      if (!oauthToken) return;

      const picker = new window.gapi.picker.PickerBuilder()
        .addView(window.gapi.picker.ViewId.DOCS)
        .addView(window.gapi.picker.ViewId.SPREADSHEETS)
        .addView(window.gapi.picker.ViewId.PRESENTATIONS)
        .addView(window.gapi.picker.ViewId.FOLDERS)
        .enableFeature(window.gapi.picker.Feature.NAV_HIDDEN)
        .setOAuthToken(oauthToken)
        .setDeveloperKey(
          process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "YOUR_API_KEY"
        )
        .setCallback((data: any) => {
          if (data.action === "picked") {
            const doc = data.docs[0];
            if (inputRef.current) {
              inputRef.current.value = doc.url;
              // Trigger change event
              const event = new Event("input", { bubbles: true });
              inputRef.current.dispatchEvent(event);
            }
            if (onGoogleFileSelected) {
              onGoogleFileSelected({
                url: doc.url,
                name: doc.name,
                id: doc.id,
              });
            }
          }
        })
        .build();

      picker.setVisible(true);
    }, [oauthToken, onGoogleFileSelected]);

    // Load the picker API on component mount if needed
    React.useEffect(() => {
      if (useGooglePicker) {
        loadPickerApi();
      }
    }, [useGooglePicker, loadPickerApi]);

    if (usePlacesAutocomplete) {
      return (
        <div className="relative">
          <input
            type={type}
            className={cn(
              "flex h-[42px] w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              type === "time" && "px-2 min-w-[120px] sm:min-w-[100px]",
              className
            )}
            ref={mergedRef}
            {...props}
          />
        </div>
      );
    }

    if (useGooglePicker) {
      return (
        <div className="flex items-center gap-2">
          <input
            type={type}
            className={cn(
              "flex h-[42px] w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              type === "time" && "px-2 min-w-[120px] sm:min-w-[100px]",
              className
            )}
            ref={mergedRef}
            {...props}
          />
          <Button
            type="button"
            onClick={loadAndOpenPicker}
            className="bg-blue-500 hover:bg-blue-600 text-white h-[42px] whitespace-nowrap"
          >
            <File className="h-4 w-4 mr-1.5" />
            {pickerButtonText}
          </Button>
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-[42px] w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          type === "time" && "px-2 min-w-[120px] sm:min-w-[100px]",
          className
        )}
        ref={mergedRef}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
