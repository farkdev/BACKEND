<nav class="navbar navbar-light bg-grey px-3">
  {{#if user}}<a class="navbar-brand" href="/home">Store</a>
  <div class="d-flex">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-person-fill my-auto" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
      
      <div class="d-flex flex-column mx-2">
        
        <p class="m-0 text-white" style="font-size: 12px">{{user.email}} </p>
        <p class="m-0 text-white" style="font-size: 12px">role:{{user.role}} </p>
      </div>
      <button class="btn btn-warning h-50 my-auto"><a href="/logout" class="text-decoration-none text-dark">Log out</a></button>
      {{else}}
      <div>
      <button class="btn btn-warning mx-2"><a href="/login" class="text-decoration-none text-dark">Log In</a></button>
      </div>
      {{/if}}

  </div>

</nav>


<div class="d-flex justify-content-center align-items-center flex-column">
    <h1 class="m-5">{{this.title}}</h1>
  <div class="w-100 px-4 mb-5">
      {{#if payload.length}}
        <table class="table table-striped table-dark">
          <thead class="text-center">
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Codigo</th>
              <th scope="col">Precio</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Stock</th>
              <th scope="col">Imagenes</th>
            </tr>
          </thead>
          <tbody class="text-center">
            {{#each payload}}
            <tr>
              <th scope="row">{{id}}</th>
              <td>{{title}}</td>
              <td>{{code}}</td>
              <td>{{price}}</td>
              <td>{{this.description}}</td>
              <td>{{this.stock}}</td>
              <td>{{this.thumbnail}}</td>
            </tr>
            {{/each}}
          </tbody>
        </table>
        {{else}}
        <h3>No hay productos para mostrar!</h3>
      {{/if}}
  </div>

</div>



<script src="/static/js/socketProducts.js"></script>