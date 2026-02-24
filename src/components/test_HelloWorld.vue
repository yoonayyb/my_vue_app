<!-- FriendAdder.vue -->
<template>
  <fieldset>
    <legend>Add new friend</legend>
    <label>
      Name:
      <input
        v-model="friendName"
        type="text"
      >
    </label>
    <br>
    <label>
      Age:
      <input
        v-model="friendAge"
        type="number"
      >
    </label>
    <br>
    <button @click="addFriend">
      Add Friend
    </button>
    <p>{{ status }}</p>
    <button @click="getDB">
      查询
    </button>
  </fieldset>
</template>

<script>
import { db } from './db';

export default {
  name: 'FriendAdder',
  props: {
    defaultAge: {
      type: Number,
      default: 21,
    },
  },
  data() {
    return {
      status: '',
      friendName: '',
      friendAge: this.defaultAge,
    };
  },
  created() {
    this.addFriend()
    console.log('🚀 ~ FriendAdder created')
  },
  methods: {
    async getDB() {
      // 根据ID查询
      const friend = await db.friends.get(2)
      console.log('🚀 ~ friend:', friend)

      // 条件查询
      const youngFriends = await db.friends
        .where('age')
        .below(30)
        .toArray()
      console.log('🚀 ~ youngFriends:', youngFriends)

      // 多条件查询
      const specificFriend = await db.friends
        .where('name').equals('张三')
        .and(friend => friend.age > 20)
        .first()
      console.log('🚀 ~ specificFriend:', specificFriend)
    },
    async addFriend() {
      try {
        await db.friends.add({
          name: '张三',
          age: 25,
          email: 'zhangsan@example.com'
        })
        // Add the new friend!
        const id = db.friends.bulkAdd([
          { name: '李四', age: 30 },
          { name: '王五', age: 28 }
        ])

        this.status = `Friend ${this.friendName}
            successfully added. Got id ${id}`;
        console.log('🚀 ~ this.status:', this.status)

        // Reset form:
        this.friendName = '';
        this.friendAge = this.defaultAge;
      } catch (error) {
        this.status = `Failed to add
            ${this.friendName}: ${error}`;
      }
    },
  },
};
</script>