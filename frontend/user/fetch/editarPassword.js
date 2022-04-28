window.onload = function() {
 
    
      const contactForm = document.getElementById("passwordreset")
      contactForm.addEventListener("submit", async function() {
         
      const email = document.getElementById("email").value
      console.log(email)
     
      const response = await fetch(`https://easymarket-backend.beagoddess.repl.co/repor`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },          
        method: "POST",
        body: `email=${email}`
      })
      alert(result.body)
      console.log(result.body)
      const result = await response.json()
      if(result.value.success) { 
          swal('Envio de mensagem', result.value.message.pt, 'success' )
      } else { 
          swal('Erro', result.value.message.pt , 'error')}
      } ); 
        
    }  
  
   