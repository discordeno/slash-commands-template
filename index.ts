import "https://raw.githubusercontent.com/cloudflare/workers-types/master/index.d.ts";

declare global {
  interface FetchEvent extends Event {
    request: Request;
    respondWith(response: Promise<Response> | Response): Promise<Response>;
  }
}

addEventListener("fetch", async (event) => {
  try {
    const signature = event.request.headers.get("X-Signature-Ed25519");
    const timestamp = event.request.headers.get("X-Signature-Timestamp");

    if (!signature || !timestamp) {
      return new Response(JSON.stringify({ error: "Bad request" }), {
        status: 400,
      });
    }

    // TODO: Handle verfiication better
    const isVerified = verifySecurity(event.request.body, signature, timestamp);
    if (!isVerified) {
      return new Response(
        JSON.stringify({ error: "Invalid request signature" }),
        {
          status: 401,
        },
      );
    }

    const response = await handlePayload(event.request.body);
    return new Response(JSON.stringify(response.body), {
      status: response.status || 200,
    });
  } catch (error) {
    // TODO: LOGGER/SENTRY?
    console.error(error);
  }

  event.respondWith(handleRequest(event.request));
});
