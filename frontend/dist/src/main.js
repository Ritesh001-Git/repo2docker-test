const status = document.getElementById('status');
const message = document.getElementById('message');
const button = document.getElementById('test-button');

button.addEventListener('click', async () => {
  status.textContent = 'Backend status: Checking...';
  status.classList.remove('success');
  try {
    const response = await fetch('/api/message');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    message.textContent = data.message;
    status.textContent = 'Backend status: Connected';
    status.classList.add('success');
  } catch (error) {
    message.textContent = `Could not reach backend: ${error.message}`;
    status.textContent = 'Backend status: Failed';
  }
});
