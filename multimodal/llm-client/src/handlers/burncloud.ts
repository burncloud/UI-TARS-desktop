import OpenAI from 'openai';
import { Stream } from 'openai/streaming';

import {
  BurncloudModel,
  CompletionParams,
  ProviderCompletionParams,
} from '../chat/index.js';
import { CompletionResponse, StreamCompletionResponse } from '../userTypes/index.js';
import { BaseHandler } from './base.js';

async function* streamBurncloud(
  response: Stream<OpenAI.Chat.Completions.ChatCompletionChunk>,
): StreamCompletionResponse {
  for await (const chunk of response) {
    yield chunk;
  }
}

export class BurncloudHandler extends BaseHandler<BurncloudModel> {
  async create(
    body: CompletionParams,
  ): Promise<CompletionResponse | StreamCompletionResponse> {
    this.validateInputs(body);

    // Uses the BURNCLOUD_API_KEY environment variable, if the apiKey is not provided.
    const apiKey = this.opts.apiKey ?? process.env.BURNCLOUD_API_KEY;
    const openai = new OpenAI({
      ...this.opts,
      apiKey,
      baseURL: 'https://ai.burncloud.com/v1',
    });

    // We have to delete the provider field because it's not a valid parameter for the OpenAI API.
    const params: any = body;
    delete params.provider;

    if (body.stream) {
      const stream = await openai.chat.completions.create(body);
      return streamBurncloud(stream);
    } else {
      return openai.chat.completions.create(body);
    }
  }
}