
// Create new post handler
async function updateHandler(event) {
    event.preventDefault();

    
    const title = document.getElementById('title').value;
    const post_body = document.getElementById('post-text').value;

    if(title && post_body) {
        const response = await fetch(`/api/posts/`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                post_body
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        
          if (response.ok) {
            document.location.replace('/dashboard/')
          } else {
            alert(response.statusText);
        }
    }
}
  
document.querySelector('.create-post-form').addEventListener('submit', updateHandler);