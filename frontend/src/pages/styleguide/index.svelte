<style>
  .container {
    display: flex;
    flex-direction: column;
    width: 560px;
    margin: 0 auto;
  }

  section {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 100px;
    margin-bottom: 100px;
  }

  .label {
    font-weight: bold;
    text-decoration: underline;
  }

  .component {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>

<div class="container">

  <h1>Styleguide</h1>

  <p>
    This is the page where, when you've finished a component, you show example
    usage of it so that other developers can see how a component was designed to
    be used.
  </p>

  <section>
    <h2 class="heading">Example Component</h2>
    <p class="description">
      Example component description, this whole thing can be removed once we
      have an actual component to put in here
    </p>
    <div class="component">
      <span class="label">Component variation 1</span>
      <!--Here we would put an imported component with example usage-->
      <h5 style="color: red;">My example heading component</h5>
    </div>
    <div class="component">
      <span class="label">Component variation 2</span>
      <!--Here we would put an imported component with example usage-->
      <h5 style="color: blue;">My example heading component in blue</h5>
    </div>
  </section>
</div>
