/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Settings as SettingsIcon, ShieldCheck, Key } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

export function SettingsModal() {
  const [apiKey, setApiKey] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem("manual_gemini_api_key");
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleSave = () => {
    localStorage.setItem("manual_gemini_api_key", apiKey);
    toast.success("API Key saved locally", {
      description: "The application will now use your manual API key for AI features.",
    });
    setOpen(false);
  };

  const handleClear = () => {
    localStorage.removeItem("manual_gemini_api_key");
    setApiKey("");
    toast.info("Manual API Key cleared", {
      description: "Reverted to environmental or default key.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="ghost" size="icon" className="h-9 w-9" title="API Settings" />}>
          <SettingsIcon className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-yellow-600" />
            API Configuration
          </DialogTitle>
          <DialogDescription>
            Enter your Gemini API key manually. It will be stored safely in your browser's local storage.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="apiKey">Gemini API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Paste your key here..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 p-3 bg-muted rounded-md text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>This key is only used to power AI assistance within this browser session.</span>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="secondary" onClick={handleClear} className="sm:mr-auto">
            Clear Key
          </Button>
          <Button type="submit" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
