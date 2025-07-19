const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require('@aws-sdk/client-bedrock-runtime');

const bedrockClient = new BedrockRuntimeClient({ region: 'us-west-2' });

module.exports.callClaude = async (event) => {
  const { prompt } = JSON.parse(event.body);

  const input = {
    modelId: 'anthropic.claude-v2', // you can change to mistral, llama, etc.
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      prompt: `Human: ${prompt}\n\nAssistant:`,
      max_tokens_to_sample: 300,
      temperature: 0.7,
      top_k: 250,
      top_p: 0.999,
      stop_sequences: ['\n\nHuman:'],
    }),
  };

  try {
    const command = new InvokeModelCommand(input);
    const response = await bedrockClient.send(command);

    const decoded = JSON.parse(new TextDecoder().decode(response.body));

    return {
      statusCode: 200,
      body: JSON.stringify({ output: decoded.completion }),
    };
  } catch (err) {
    console.error('Bedrock Error', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
