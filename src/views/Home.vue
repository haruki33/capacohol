<template>
  <!-- loading表示用 -->
  <div class="ui active inverted page dimmer" v-if="isCallingApi">
    <div class="ui text loader">Loading</div>
  </div>

  <!-- エラーメッセージ用-->
  <p class="ui negative message" v-if="errorMsg">
    <i class="close icon" @click="clearMsg('error')"></i>
    <span class="header">エラーが発生しました！</span>
    {{ errorMsg }}
  </p>

  <!-- 成功メッセージ用-->
  <p class="ui positive message" v-if="successMsg">
    <i class="close icon" @click="clearMsg"></i>
    <span class="header">成功！</span>
    {{ successMsg }}
  </p>
  <v-container>
    <h1 class="ui header"></h1>

    <!-- お酒登録ボックス -->
    <v-card>
      <v-card-title class="text-h5 font-weight-regular"
        >{{ post.date }} の飲酒記録</v-card-title
      >
      <!-- 色使い（フォームをビールみたいな色合いにしたい） -->
      <v-form class="pa-5 bg-yellow-lighten-3" @submit.prevent="postRecord">
        <div class="text-caption pa-3">お酒の種類</div>
        <v-btn-toggle v-model="post.alcoholContent" color="yellow">
          <v-btn prepend-icon="mdi-beer" :value="5" stacked>ビール</v-btn>
          <v-btn prepend-icon="mdi-glass-mug" :value="7" stacked
            >ハイボール</v-btn
          >
          <v-btn prepend-icon="mdi-glass-wine" :value="12" stacked
            >ワイン</v-btn
          >
          <v-btn prepend-icon="mdi-bottle-soda" :value="15" stacked>清酒</v-btn>
          <v-btn prepend-icon="mdi-glass-stange" :value="25" stacked
            >焼酎</v-btn
          >
          <v-btn prepend-icon="mdi-cup" :value="40" stacked>ウイスキー</v-btn>
        </v-btn-toggle>

        <div class="text-caption pa-3">飲んだ量</div>
        <v-text-field
          type="number"
          v-model.number="post.alcoholQuantity"
          label="ml"
          bg-color="white"
        ></v-text-field>

        <div class="text-caption pa-3">本数</div>
        <v-text-field
          type="number"
          v-model.number="post.alcoholNum"
          label="本・缶・杯"
          bg-color="white"
        ></v-text-field>

        <div class="text-caption pa-3">酔い度</div>
        <v-autocomplete
          label="酔い度"
          v-model="post.currentIntoxicationLevel"
          :items="currentIntoxicationLevels"
          item-title="text"
          bg-color="white"
        ></v-autocomplete>

        <v-btn
          rounded="xg"
          class="right-align"
          block
          :disabled="isPostButtonDisabled"
          color="teal"
          type="submit"
          >登録</v-btn
        >
      </v-form>
    </v-card>
  </v-container>

  <v-container>
    <!-- 履歴標示 -->
    <h3 class="ui dividing header">飲酒記録</h3>
    <template v-if="records.length > 0">
      <template v-for="(record, index) in records" :key="index">
        <v-card class="pa-3">
          <v-row>
            <v-col cols="auto">
              <v-card-title
                >酔い度: {{ record.currentIntoxicationLevel }}</v-card-title
              >
              <v-card-subtitle>
                アルコール度数: {{ record.alcoholContent }}%、 飲んだ量:
                {{ record.alcoholQuantity }}ml、 本数:
                {{ record.alcoholNum }}</v-card-subtitle
              >
            </v-col>
          </v-row>
        </v-card>
      </template>
    </template>
  </v-container>
</template>

<script>
import { baseUrl } from "@/assets/config.js";

export default {
  name: "Home",

  data() {
    return {
      userId: "",
      affilicationId: "",
      currentIntoxicationLevels: [
        { value: "1", text: "ほろ酔い" },
        { value: "2", text: "そこそこ酔い" },
        { value: "3", text: "マジ酔い" },
      ],
      post: {
        date: null,
        alcoholContent: null,
        alcoholNum: null,
        alcoholQuantity: null,
        currentIntoxicationLevel: null,
      },
      records: [],
      successMsg: "",
      errorMsg: "",
      isCallingApi: false,
    };
  },

  async mounted() {
    this.setDate();
    await this.getRecords();
  },

  computed: {
    isPostButtonDisabled() {
      return (
        !this.post.alcoholContent ||
        !this.post.alcoholNum ||
        !this.post.alcoholQuantity ||
        !this.post.currentIntoxicationLevel
      );
    },
  },

  methods: {
    clearMsg(target) {
      if (target === "error") {
        this.errorMsg = "";
      } else {
        this.successMsg = "";
      }
    },

    isMyAlcohol(userId) {
      return this.userId === userId;
    },

    async getAlcoholRecords() {
      if (this.isCallingApi) {
        return;
      }
      this.isCallingApi = true;

      try {
        const res = await fetch(
          `${baseUrl}/AlcoholIntakeRecords?userId=${this.userId}&date=${this.post.date}`,
          {
            method: "GET",
            headers: {
              Authorization: "mtiToken", // 適切なトークンを設定してください
            },
          }
        );

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};

        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        this.records = jsonData.records ?? [];
      } catch (e) {
        this.errorMsg = `飲酒記録取得時にエラーが発生しました: ${e.message}`;
      } finally {
        this.isCallingApi = false;
      }
    },

    async postRecord() {
      if (this.isCallingApi) {
        return;
      }
      this.isCallingApi = true;

      const reqBody = {
        userId: this.userId,
        affilicationId: this.affilicationId,
        date: this.post.date,
        alcoholContent: this.post.alcoholContent,
        alcoholQuantity: this.post.alcoholQuantity,
        alcoholNum: this.post.alcoholNum,
        currentIntoxicationLevel: this.post.currentIntoxicationLevel,
      };

      try {
        const res = await fetch(baseUrl + "/AlcoholIntakeRecords", {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: {
            "Content-Type": "application/json",
            Authorization: "mtiToken", // ここを適切なトークンに変更
          },
        });

        const jsonData = await res.json();

        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        this.records.unshift({ ...reqBody, timestamp: Date.now() });
        this.successMsg = "お酒を登録出来ました！";
        this.post.alcoholContent = "";
        this.post.alcoholQuantity = "";
        this.post.alcoholNum = "";
        this.post.currentIntoxicationLevel = "";
      } catch (e) {
        this.errorMsg = e.message;
      } finally {
        this.isCallingApi = false;
      }
    },

    async deleteAlcohol(alcohol) {
      if (this.isCallingApi) {
        return;
      }
      this.isCallingApi = true;

      const { userId, timestamp } = alcohol;

      try {
        const res = await fetch(
          `${baseUrl}/AlcoholIntakeRecords?userId=${userId}&timestamp=${timestamp}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "mtiToken", // ここを適切なトークンに変更
            },
          }
        );

        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        const deleted = this.records.findIndex(
          (a) => a.userId === userId && a.timestamp === timestamp
        );
        this.records.splice(deleted, 1);
        this.successMsg = "履歴が削除されました！";
      } catch (e) {
        this.errorMsg = e.message;
      } finally {
        this.isCallingApi = false;
      }
    },

    convertToLocaleString(timestamp) {
      const dt_object = datetime.fromtimestamp(timestamp);
      return dt_object.strftime("%H:%M");
    },

    setDate() {
      // 今日の日付をYYYY-MM-DD形式で取得
      const today = new Date().toISOString().slice(0, 10);
      this.post.date = today;
    },

    checkLocalStrage() {
      const userId = window.localStorage.getItem("userId");
      const affilicationId = window.localStorage.getItem("affilicationId");
      const token = window.localStorage.getItem("token");

      if (userId && affilicationId && token) {
        this.userId = window.localStorage.getItem("userId");
        this.affilicationId = window.localStorage.getItem("affilicationId");
        return true;
      }
      return false;
    },

    async getRecords() {
      if (this.checkLocalStrage()) {
        await this.getAlcoholRecords();
      } else {
        window.localStorage.clear();
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style scoped>
.right-align {
  text-align: right;
}
.alcoholContent {
  width: 150px;
}
.alcoholNum {
  text-align: left;
  width: 150px;
}
.selectToxication {
  text-align: left;
  width: 300px;
}
.ui.main.container {
  margin-bottom: 100px; /* メニューバーの高さと同じ値に設定 */
  padding-bottom: 100px; /* メニューバーの高さを余白として追加 */
}
.ui.comments.divided.alcohol-list {
  list-style-type: none;
}
</style>
