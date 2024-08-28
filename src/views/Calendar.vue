<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <h1 class="ui dividing header">お酒カレンダー</h1>
      <div class="ui segment calendar-segment">
        <VDatePicker expanded v-model.string="selectedDate" :masks="masks" />
      </div>

      <!-- 履歴標示 -->
      <div class="ui segment record">
        <div class="ui comments">
          <h3 class="ui dividing header">{{ selectedDate }} の飲酒記録</h3>
          <template v-for="(record, index) in records" :key="index">
            <div class="ui comment">
              <div class="content">
                <button
                  v-if="isMyAlcohol(record.userId)"
                  class="ui negative mini button right floated"
                  @click="deleteAlcohol(record)"
                >
                  削除
                </button>
                <p class="text">
                  アルコール度数: {{ record.alcoholContent }}%、 飲んだ量:
                  {{ record.alcoholQuantity }}ml、 本数:
                  {{ record.alcoholNum }}
                </p>
                <span class="ui green label">
                  酔い度: {{ record.currentIntoxicationLevel }}</span
                >
                <div class="ui divider"></div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from "@/assets/config.js";
import { Calendar } from "v-calendar";
import "v-calendar/style.css";
import { ref } from "vue";
const headers = { Authorization: "mtiToken" };

export default {
  name: "Calendar",

  components: {
    // 読み込んだコンポーネント名をここに記述する
    Calendar,
  },

  data() {
    // Vue.jsで使う変数はここに記述する

    return {
      selectedDate: null,
      masks: ref({ modelValue: "YYYY-MM-DD" }),
      records: [],
    };
  },

  async mounted() {
    this.setDate();
    console.log(this.selectedDate);

    await this.getRecords();
  },

  methods: {
    setDate() {
      // 今日の日付をYYYY-MM-DD形式で取得
      const today = new Date().toISOString().slice(0, 10);
      this.selectedDate = today;
    },

    isMyAlcohol(userId) {
      return this.userId === userId;
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

    async getAlcoholRecords() {
      if (this.isCallingApi) {
        return;
      }
      this.isCallingApi = true;

      try {
        const res = await fetch(
          `${baseUrl}/AlcoholIntakeRecords?userId=${this.userId}&date=${this.selectedDate}`,
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
/* このコンポーネントだけに適用するCSSはここに記述する */
.ui.main.container {
  margin-bottom: 100px; /* メニューバーの高さと同じ値に設定 */
  padding-bottom: 100px; /* メニューバーの高さを余白として追加 */
}

.ui.comments.divided.alcohol-list {
  list-style-type: none;
}

.cal {
  justify-content: center;
  align-items: center;
}
</style>
