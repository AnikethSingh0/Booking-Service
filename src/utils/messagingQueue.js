const amqplib = require("amqplib");
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config/index");

const QUEUE_NAME = "my_queue";

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    throw error;
  }
};

const subscribeMessage = async (channel, binding_key, service) => {
  const applicationQueue = await channel.assertQueue(QUEUE_NAME, { durable: true });
  await channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

  channel.consume(applicationQueue.queue, (msg) => {
    if (!msg) {
      console.log("Consumer cancelled by server or queue deleted.");
      return;
    }
    console.log("Received data:");
    console.log(msg.content.toString());

    channel.ack(msg);
  });
};


const publishMessage = async (channel, binding_key, message) => {
  try {
    //await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    await channel.assertQueue(QUEUE_NAME);
    //await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, binding_key);

    const sent = channel.publish(
      EXCHANGE_NAME,
      binding_key,
      Buffer.from(message)
    );

    if (sent) {
      console.log(`✅ Message sent: ${message}`);
    } else {
      console.warn("⚠️ Message not sent (buffer full)");
    }
  } catch (error) {
    console.error("❌ Error publishing message:", error);
    throw error;
  }
};


module.exports = {
  createChannel,
  subscribeMessage,
  publishMessage,
};
