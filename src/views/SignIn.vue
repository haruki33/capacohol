<template>
  <v-app style="background-color: #f7d88a">
    <v-main>
      <v-container class="d-flex align-center justify-center fill-height">
        <v-card
          width="70%"
          class="mx-auto mt-5 pa-5"
          :disabled="loading"
          :loading="loading"
        >
          <template v-slot:loader="{ isActive }">
            <v-progress-linear
              :active="isActive"
              color="deep-purple"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-alert v-if="errorMSg" type="error" dense outlined>{{
            errorMsg
          }}</v-alert>

          <v-img
            class="mx-auto my-6"
            max-width="200"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
          ></v-img>

          <v-form v-model="form" @submit.prevent="submit">
            <div class="text-subtitle-1 text-medium-emphasis">ユーザーID</div>
            <v-text-field
              v-model="user.userId"
              :readonly="loading"
              :rules="[rules.required]"
              label="ID"
              placeholder="Enter your userID"
              class="mb-3"
              prepend-inner-icon="mdi-account"
              clearable
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">所属ID</div>
            <v-text-field
              v-model="user.affilicationId"
              :readonly="loading"
              :rules="[rules.required]"
              class="mb-3"
              label="AffilicationID"
              placeholder="Enter your affilicationID"
              prepend-inner-icon="mdi-account-group"
              clearable
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">体重</div>
            <v-text-field
              v-model="user.weight"
              :readonly="loading"
              :rules="[rules.required]"
              class="mb-3"
              label="Weight"
              placeholder="Enter your Weight"
              prepend-inner-icon="mdi-weight"
              clearable
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">好きなお酒</div>
            <v-text-field
              v-model="user.likeSake"
              :readonly="loading"
              :rules="[rules.required]"
              class="mb-3"
              label="likeSake"
              placeholder="Enter your likeSake"
              prepend-inner-icon="mdi-glass-mug"
              clearable
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">パスワード</div>
            <v-text-field
              v-model="user.password"
              :readonly="loading"
              :rules="[rules.required]"
              :type="visible ? 'text' : 'password'"
              class="mb-3"
              label="Password"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="visible = !visible"
            ></v-text-field>

            <v-btn
              :disabled="!form"
              color="#f7d88a"
              size="large"
              type="submit"
              variant="elevated"
              block
            >
              SignUp
            </v-btn>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { baseUrl } from "@/assets/config.js";

export default {
  name: "SingIn",

  data() {
    return {
      rules: {
        required: (value) => !!value || "入力必須項目です",
      },
      user: {
        userId: null,
        affilicationId: null,
        password: null,
        weight: null,
        likeSake: null,
      },
      errorMsg: "", // エラーメッセージ用
      loading: false, // ローディング表示用
      visible: false,
    };
  },

  methods: {
    // エラーメッセージ用
    clearError() {
      this.errorMsg = "";
    },

    async submit() {
      this.loading = true;

      const path = "/user/signup";
      const { userId, affilicationId, password, weight, likeSake } = this.user;
      const reqBody = { userId, password, affilicationId, weight, likeSake };

      try {
        const res = await fetch(baseUrl + path, {
          method: "POST",
          body: JSON.stringify(reqBody),
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        window.localStorage.setItem("token", jsonData.token);
        window.localStorage.setItem("userId", this.user.userId);
        window.localStorage.setItem("affilicationId", this.user.affilicationId);

        this.$router.push({ name: "Profile" });
      } catch (e) {
        console.error(e);
        this.errorMsg = e;
      } finally {
        this.isCallingApi = false;
      }
    },
  },
};
</script>

<style scoped></style>
