import CustomerCreatedEvent from "./customer-created.event";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendSmsWhenCustomerIsCreatedHandler from "./handler/send-sms-when-customer-is-created.handler";
import SendEmailWhenCustomerIsCreatedHandler from "./handler/send-mail-when-customer-is-created.handler";
import SendAlertWhenCustomerAddressUpdatedHandler from "./handler/send-alert-when-customer-address-updated.handler";
import CustomerAddressUpdatedEvent from "./customer-address-updated.event";

describe("Customer Address events tests", () => {

  it("Customer Address Updated: Should notify all event handlers", () => {
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