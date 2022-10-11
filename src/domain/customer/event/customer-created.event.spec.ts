import CustomerCreatedEvent from "./customer-created.event";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendSmsWhenCustomerIsCreatedHandler from "./handler/send-sms-when-customer-is-created.handler";
import SendEmailWhenCustomerIsCreatedHandler from "./handler/send-mail-when-customer-is-created.handler";
import SendAlertWhenCustomerAddressUpdatedHandler from "./handler/send-alert-when-customer-address-updated.handler";
import CustomerAddressUpdatedEvent from "./customer-address-updated.event";

describe("Customer events tests", () => {
  it("Customer Created: Should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandlerFirst = new SendSmsWhenCustomerIsCreatedHandler();
    const eventHandlerSecond = new SendEmailWhenCustomerIsCreatedHandler();
    const spyEventHandlerFirst = jest.spyOn(eventHandlerFirst, "handle");
    const spyEventHandlerSecond = jest.spyOn(eventHandlerSecond, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerFirst);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerSecond);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerFirst);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandlerSecond);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Joao",
      address: "xyz",
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandlerFirst).toHaveBeenCalled();
    expect(spyEventHandlerSecond).toHaveBeenCalled();
  });

  it("Customer Changed: Should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendAlertWhenCustomerAddressUpdatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressUpdatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressUpdatedEvent"][0]
    ).toMatchObject(eventHandler);

    const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent({
      id: "123",
      endereco: "rua x",
      nome: "customer",
    });

    eventDispatcher.notify(customerAddressUpdatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});