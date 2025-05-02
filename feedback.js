let currentUser = 'user1'; // Replace with actual session/user
let isAdmin = false; // Replace with actual role check

function postFeedback() {
  const text = document.getElementById("newFeedback").value;
  if (!text.trim()) return;

  const feedback = {
    id: Date.now(),
    user: currentUser,
    text,
    createdAt: new Date().toISOString(),
    likes: 0,
    replies: [],
  };

  saveFeedback(feedback);
  renderFeedback();
  document.getElementById("newFeedback").value = '';
}

function saveFeedback(fb) {
  let posts = JSON.parse(localStorage.getItem("feedbacks")) || [];
  posts.push(fb);
  localStorage.setItem("feedbacks", JSON.stringify(posts));
}

function renderFeedback() {
  const list = document.getElementById("feedbackList");
  list.innerHTML = '';
  const posts = JSON.parse(localStorage.getItem("feedbacks")) || [];

  posts.forEach(fb => {
    const div = document.createElement("div");
    div.className = "feedback";
    div.innerHTML = `
      <div><strong>${fb.user}</strong>: ${fb.text}</div>
      <div class="meta">${new Date(fb.createdAt).toLocaleString()}</div>
      <div class="actions">
        <button class="like-btn" onclick="likeFeedback(${fb.id})">👍 ${fb.likes}</button>
        ${fb.user === currentUser && isEditable(fb.createdAt) ? `<button onclick="editFeedback(${fb.id})">Edit</button>` : ''}
        ${isAdmin ? `<button onclick="deleteFeedback(${fb.id})">Delete</button>` : ''}
        <div class="reply">
          <input placeholder="Reply..." onkeydown="handleReply(event, ${fb.id})"/>
          <div>${(fb.replies || []).map(r => `<p><strong>${r.user}</strong>: ${r.text}</p>`).join('')}</div>
        </div>
      </div>
    `;
    list.appendChild(div);
  });
}

function isEditable(createdAt) {
  return (new Date() - new Date(createdAt)) <= 5 * 60 * 1000;
}

function editFeedback(id) {
  const posts = JSON.parse(localStorage.getItem("feedbacks"));
  const fb = posts.find(p => p.id === id);
  const newText = prompt("Edit your feedback:", fb.text);
  if (newText) {
    fb.text = newText;
    localStorage.setItem("feedbacks", JSON.stringify(posts));
    renderFeedback();
  }
}

function deleteFeedback(id) {
  let posts = JSON.parse(localStorage.getItem("feedbacks"));
  posts = posts.filter(p => p.id !== id);
  localStorage.setItem("feedbacks", JSON.stringify(posts));
  renderFeedback();
}

function likeFeedback(id) {
  const posts = JSON.parse(localStorage.getItem("feedbacks"));
  const fb = posts.find(p => p.id === id);
  fb.likes++;
  localStorage.setItem("feedbacks", JSON.stringify(posts));
  renderFeedback();
}

function handleReply(e, id) {
  if (e.key === "Enter") {
    const posts = JSON.parse(localStorage.getItem("feedbacks"));
    const fb = posts.find(p => p.id === id);
    fb.replies = fb.replies || [];
    fb.replies.push({ user: currentUser, text: e.target.value });
    localStorage.setItem("feedbacks", JSON.stringify(posts));
    e.target.value = '';
    renderFeedback();
  }
}

document.addEventListener("DOMContentLoaded", renderFeedback);
