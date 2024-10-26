import spinner from "./spinner.json";

export async function GET() {
  return new Response(JSON.stringify(spinner), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}