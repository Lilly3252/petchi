import { Event } from "@yuudachi/framework/types";
import { injectable, inject } from "@needle-di/core";
import { Client, Events } from "discord.js";

@injectable()
export default class implements Event {
  public name = "Client Ready";
  public event = Events.ClientReady as const;
  public disabled = false;

  constructor(public readonly client:Client<true> = inject(Client)) {}

  public execute(): void {
    this.client.once(this.event, () => {
      console.log("✅ Bot connected successfully!");
    });
  }
}



