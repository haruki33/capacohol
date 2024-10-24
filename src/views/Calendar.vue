<template>
  <v-container>
    <DatePicker
      expanded
      v-model.string="selectedDate"
      :masks="masks"
      :attributes="attrs"
    />
  </v-container>

  <v-container>
    <!-- 履歴標示 -->
    <v-card>
      <v-card-title class="text-h5 font-weight-regular"
        >{{ selectedDate }}の飲酒履歴</v-card-title
      >
      <template v-if="recordsOnSelectedDate.length > 0">
        <template v-for="(record, index) in recordsOnSelectedDate" :key="index">
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title class="text-h6 pb-2"
              >酔い度: {{ record.currentIntoxicationLevel }}</v-list-item-title
            >
            <v-list-subtitle>
              アルコール度数: {{ record.alcoholContent }}%、 飲んだ量:
              {{ record.alcoholQuantity }}ml、 本数:
              {{ record.alcoholNum }}</v-list-subtitle
            >
          </v-list-item>
        </template>
      </template>
      <template v-else>
        <v-list-item>
          <v-list-title class="text-h6 pb-2">No datas</v-list-title>
        </v-list-item>
      </template>
    </v-card>
  </v-container>
</template>

<script>
import { baseUrl } from "@/assets/config.js";
import { Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";

export default {
  name: "Calendar",

  components: {
    Calendar,
    DatePicker,
  },

  data() {
    return {
      // ユーザ関連
      userId: window.localStorage.getItem("userId"),

      // 日付によって変化
      selectedDate: "",
      nowMonth: "",
      recordsPerMonth: [],
      recordsOnSelectedDate: [],
      datesHasRecords: [],

      // カレンダーの設定
      masks: { modelValue: "YYYY-MM-DD" },
      // attrs: {
      //   highlight: true,
      //   dates: [new Date(2024, 10, 2), new Date(2024, 10, 7)],
      // },

      date: new Date(2024, 10, 23),
    };
  },

  async mounted() {
    // mountされたら現在の日にちと月を変数にセットしたい
    this.setDate();
    this.setMonth();
    // 今月の記録を取得
    await this.fetchAllRecordsPerMonth();
    // await this.extractDateFromAllRecords();
    // await this.setAttrsDate();
    await this.extractRecordsOnSelectedDateFromRecords();
  },

  watch: {
    //　日付を選択，月の変更で取得するデータを変える
    selectedDate() {
      this.extractRecordsOnSelectedDateFromRecords(); //recordsの中から取ってくるようにしたい
    },
    // nowMonth() {
    //   this.fetchAllRecordsPerMonth(); //月が替わるごとに全部フェッチしたい
    // },
  },

  methods: {
    setDate() {
      this.selectedDate = new Date().toISOString().slice(0, 10);
    },

    setMonth() {
      this.nowMonth = new Date().toISOString().slice(5, 7);
    },

    async fetchAllRecordsPerMonth() {
      try {
        const res = await fetch(
          `${baseUrl}/calendar?userId=${this.userId}&month=${this.nowMonth}`,
          {
            method: "GET",
            headers: {
              Authorization: "mtiToken", // 適切なトークンを設定してください
            },
          }
        );

        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        const text = await res.text();
        this.recordsPerMonth = text ? JSON.parse(text) : {};
      } catch (e) {
        this.errorMsg = `飲酒記録取得時にエラーが発生しました: ${e.message}`;
      }
    },

    // refを使っているから.valueで指定する必要あり
    async extractRecordsOnSelectedDateFromRecords() {
      const recordsInTheMonth = await this.recordsPerMonth;
      const selectedDateRecords = [];
      for (var i = 0; i < recordsInTheMonth.length; i++) {
        if (recordsInTheMonth[i].date == this.selectedDate) {
          selectedDateRecords.push(recordsInTheMonth[i]);
        }
      }
      this.recordsOnSelectedDate = selectedDateRecords;
    },

    async extractDateFromAllRecords() {
      const recordsInTheMonth = await this.recordsPerMonth;
      const datesHasRecords = [];
      const seenDates = new Set();

      recordsInTheMonth.forEach((entry) => {
        if (!seenDates.has(entry.date)) {
          seenDates.add(entry.date);
          datesHasRecords.push({
            year: Number(entry.date.slice(0, 4)),
            month: Number(entry.date.slice(5, 7)),
            date: Number(entry.date.slice(8, 10)),
          });
        }
        this.datesHasRecords = datesHasRecords;
      });
    },

    async setAttrsDate() {
      const dates = await this.datesHasRecords;
      dates.forEach((entry) => {
        this.attrs.dates.push(new Date(entry.year, entry.month, entry.date));
      });
    },
  },
};
</script>

<style scoped></style>
