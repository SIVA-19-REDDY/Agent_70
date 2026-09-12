async function test() {
  const res = await fetch('http://localhost:5000/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: "Which courses require immediate intervention this semester?"
    })
  });
  const data = await res.json();
  console.log("Provider used:", data.provider_used);
  console.log("Is Demo:", data.is_demo);
  console.log("Executive answer:", data.data?.executive_answer);
  console.log("Top Priority Course:", data.data?.priority_ranking?.[0]);
  console.log("Confidence:", data.data?.confidence);
}

test();
