export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.substring(1); // removes leading slash

    // Access the R2 bucket (binding variable: VIDEOS)
    const object = await env.VIDEOS.get(path);
    if (!object) {
      return new Response("File not found", { status: 404 });
    }

    return new Response(object.body, {
      headers: { "Content-Type": "video/mp4" },
    });
  }
};
