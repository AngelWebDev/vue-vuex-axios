<template>
  <div class="home">
    <h1> this is a main page</h1>
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>About</th>
          <th>Contorls</th>
        </tr>
        <tr v-for="(user, index) in usersArray" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td><button @click="itemIndex = index">Show more</button></td>
          <td><button @click="deleteUser(user)"> Delete </button> </td>
        </tr>
      </table>
    </div>
    <base-modal
      v-if="usersArray[itemIndex]"
      @close="itemIndex = null"
      :name="usersArray[itemIndex].name"
      :username="usersArray[itemIndex].username"
      :email="usersArray[itemIndex].email"
      :website="usersArray[itemIndex].website"
      :value="itemIndex != null"
      @change="handleModal"
    />
  </div>
</template>

<script>
import BaseModal from '@/components/BaseModal.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'page-main',
  components: {
    BaseModal,
  },
  data() {
    return {
      showModal: false,
      itemIndex: null,
    };
  },
  computed: {
    ...mapState(['usersArray']),
  },
  methods: {
    ...mapActions({
      fetchUsers: 'users/fetchUsers',
    }),
    deleteUser(user) {
      this.$store.dispatch('removeUser', user);
    },
    handleModal(v) {
      if (!v) {
        this.itemIndex = null;
      }
    },
  },
  created() {
    this.$store.dispatch('fetchUsers');
  },
};
</script>

<style lang="scss">
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
h1 {
  padding: 0;
  margin: 0;
}
.table-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
table,
td,
th {
  border: 1px solid #ddd;
  text-align: left;
}

table {
  border-collapse: collapse;
}

th,
td {
  padding: 15px;
}
</style>

