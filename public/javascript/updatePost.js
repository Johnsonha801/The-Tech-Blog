
// Update the users post
async function updateHandler(event) {
    event.preventDefault();
    
  
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    
    const title = document.querySelector('input[name="title"]').value;
    const post_body = document.getElementById('post_body').value;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
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
  
document.querySelector('.update-post-form').addEventListener('submit', updateHandler);