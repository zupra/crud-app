<template>
  <div>
    <div>
      <h1>Welcome</h1>
      <p>Login for Use the navigation above.</p>
    </div>
    <hr />

    <div>
      <label>
        <input
          type="text"
          placeholder="username"
          v-model="User.username"
          required
        />
      </label>

      <label>
        <input
          type="password"
          placeholder="password"
          v-model="User.password"
          required
        />
      </label>

      <button @click="login">login</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      User: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      try {
        const { data } = await this.$http.get("/login", {
          params: { ...this.User }
        });
        localStorage.setItem("token", data.token);
      } catch ({ response }) {
        alert(response.data.message);
      }
    }
  }
};
</script>
