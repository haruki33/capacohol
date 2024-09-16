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

  <h1 class="ui header">{{ post.date }}</h1>

  <!-- お酒登録ボックス -->
  <h3 class="ui dividing header">飲酒記録</h3>
  <div class="ui segment">
    <form class="ui form" @submit.prevent="postRecord">
      <div class="inline field">
        <label for="AlcoholContent">アルコール度数</label><br />
        <input
          v-model="post.alcoholContent"
          type="number"
          id="AlcoholContent"
          name="AlcoholContent"
          placeholder="%"
        />
      </div>

      <div class="inline field">
        <label for="AlcoholQuantity">飲んだ量</label><br />
        <input
          v-model="post.alcoholQuantity"
          type="number"
          id="AlcoholQuantity"
          name="AlcoholQuantity"
          placeholder="ml"
        />
      </div>

      <div class="inline field">
        <label for="AlcoholNum">飲んだ本数</label><br />
        <input
          v-model="post.alcoholNum"
          type="number"
          id="AlcoholNum"
          name="AlcoholNum"
          placeholder="本・缶・杯"
        />
      </div>

      <div class="inline field">
        <label for="CurrentIntoxicationLevel"
          >あなたの酔い度を選択してください</label
        ><br />
        <select
          id="CurrentIntoxicationLevel"
          v-model="post.currentIntoxicationLevel"
        >
          <option
            v-for="CurrentIntoxicationLevel in CurrentIntoxicationLevels"
            :value="CurrentIntoxicationLevel.value"
            :key="CurrentIntoxicationLevel.value"
          >
            {{ CurrentIntoxicationLevel.text }}
          </option>
        </select>
      </div>

      <div class="right-align">
        <button
          class="ui green button"
          type="submit"
          :disabled="isPostButtonDisabled"
        >
          登録
        </button>
      </div>
    </form>
  </div>

  <!-- 履歴標示 -->
  <h3 class="ui dividing header">飲酒記録</h3>
  <div class="ui segment record">
    <div class="ui divided items">
      <template v-if="records.length > 0">
        <template v-for="(record, index) in records" :key="index">
          <div class="item">
            <div class="content">
              <button
                v-if="isMyAlcohol(record.userId)"
                class="ui negative mini button right floated"
                @click="deleteAlcohol(record)"
              >
                削除
              </button>
              <div class="ui green header">
                酔い度: {{ record.currentIntoxicationLevel }}
              </div>
              <p class="text">
                アルコール度数: {{ record.alcoholContent }}%、 飲んだ量:
                {{ record.alcoholQuantity }}ml、 本数:
                {{ record.alcoholNum }}
              </p>
            </div>
          </div>
        </template>
      </template>
      <template v-else class="item">
        <div class="content">
          <div class="ui grey header">no data</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/assets/config.js";

export default {
  name: "Home",

  data() {
    return {
      userId: "",
      affilicationId: "",
      CurrentIntoxicationLevels: [
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
