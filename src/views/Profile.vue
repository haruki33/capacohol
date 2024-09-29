<template>
  <v-container class="pa-4">
    <div class="text-h6 text-center">お酒免許書</div>
    <v-divider class="ma-2 opacity-100"></v-divider>
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="8" md="6" lg="6" xl="6" xxl="6">
        <v-card outlined elevation="10" rounded="3">
          <!-- 免許証のヘッダー部分 -->
          <v-card
            border="opacity-100 sm"
            class="rounded-pill mx-3 my-3"
            elevation="0"
          >
            <v-row no-gutters>
              <v-col cols="2" class="mx-0">
                <div class="text-center">氏名</div>
              </v-col>
              <v-divider class="border-opacity-100" vertical></v-divider>
              <v-col cols="5">
                <div class="text-center">{{ user.userId }}</div>
              </v-col>
              <v-divider class="border-opacity-100" vertical></v-divider>
              <v-col cols="5">
                <div class="text-center">令和 5 年 9 月 16 日</div>
              </v-col>
            </v-row>
          </v-card>

          <!-- 写真と名前の部分 -->
          <v-card
            border="opacity-100 sm"
            rounded="2"
            class="mx-3 my-3"
            elevation="0"
          >
            <v-row no-gutters class="border-bottom">
              <v-col cols="2">
                <div class="text-center">住所</div>
              </v-col>
              <v-divider class="border-opacity-100" vertical></v-divider>
              <v-col cols="10" class="text-center">○○県○○市○○町</v-col>
            </v-row>

            <!-- 免許証情報の部分 -->
            <v-row no-gutters>
              <v-col cols="8">
                <v-row no-gutters>
                  <v-col cols="3">
                    <div class="text-center">交付</div>
                  </v-col>
                  <v-divider class="border-opacity-100" vertical></v-divider>
                  <v-col cols="9">
                    <div class="text-center">○○</div>
                  </v-col>
                </v-row>
                <v-divider class="border-opacity-100"></v-divider>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-sheet style="background-color: #f7d88a">
                      <p class="text-h6 ml-1">酒の強さ：</p>
                    </v-sheet>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-sheet>
                      <p class="ml-1">免許の条件等：がちで酒弱いです泣</p>
                    </v-sheet>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="5">
                    <v-sheet class="text-h6 mt-14 ml-1">現在の酔い度</v-sheet>
                  </v-col>
                  <v-col cols="7" class="text-h4 mt-11 font-weight-bold"
                    >がち酔い</v-col
                  >
                </v-row>
                <v-divider class="opacity-80"></v-divider>
                <div class="ma-2">
                  <v-row no-gutters>
                    <v-col cols="2">
                      <v-sheet align="center" justify="center">
                        <p class="text-center vertical-text mt-1">好きな酒</p>
                      </v-sheet>
                    </v-col>
                    <v-col cols="10">
                      <v-row no-gutters>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="4">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-sheet :height="200" class="ma-2" border></v-sheet>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12" class="mb-2 text-center" style="color: red"
                    >お酒安全委員会</v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="8" lg="6" xl="6" xxl="6">
        <v-card outlined elevation="10" rounded="3">
          <!-- 免許証のヘッダー部分 -->
          <v-card
            border="opacity-100 sm"
            class="rounded-pill mx-3 my-3"
            elevation="0"
          >
            <v-row no-gutters>
              <v-col cols="2" class="mx-0">
                <div class="text-center">氏名</div>
              </v-col>
              <v-divider class="border-opacity-100" vertical></v-divider>
              <v-col cols="5">
                <div class="text-center">{{ user.userId }}</div>
              </v-col>
              <v-divider class="border-opacity-100" vertical></v-divider>
              <v-col cols="5">
                <div class="text-center">令和 5 年 9 月 16 日</div>
              </v-col>
            </v-row>
          </v-card>

          <!-- 写真と名前の部分 -->
          <v-card
            border="opacity-100 sm"
            rounded="2"
            class="mx-3 my-3"
            elevation="0"
          >
            <v-row no-gutters class="border-bottom">
              <v-col cols="2">
                <div class="text-center">住所</div>
              </v-col>
              <v-divider class="border-opacity-100" vertical></v-divider>
              <v-col cols="10" class="text-center">○○県○○市○○町</v-col>
            </v-row>

            <!-- 免許証情報の部分 -->
            <v-row no-gutters>
              <v-col cols="8">
                <v-row no-gutters>
                  <v-col cols="3">
                    <div class="text-center">交付</div>
                  </v-col>
                  <v-divider class="border-opacity-100" vertical></v-divider>
                  <v-col cols="9">
                    <div class="text-center">○○</div>
                  </v-col>
                </v-row>
                <v-divider class="border-opacity-100"></v-divider>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-sheet style="background-color: #f7d88a">
                      <p class="text-h6 ml-1">酒の強さ：</p>
                    </v-sheet>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-sheet>
                      <p class="ml-1">免許の条件等：がちで酒弱いです泣</p>
                    </v-sheet>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="5">
                    <v-sheet class="text-h6 mt-14 ml-1">現在の酔い度</v-sheet>
                  </v-col>
                  <v-col cols="7" class="text-h4 mt-11 font-weight-bold"
                    >がち酔い</v-col
                  >
                </v-row>
                <v-divider class="opacity-80"></v-divider>
                <div class="ma-2">
                  <v-row no-gutters>
                    <v-col cols="2">
                      <v-sheet align="center" justify="center">
                        <p class="text-center vertical-text mt-1">好きな酒</p>
                      </v-sheet>
                    </v-col>
                    <v-col cols="10">
                      <v-row no-gutters>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                        <v-col cols="3">
                          <v-sheet class="text-h6 text-center">beer</v-sheet>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="4">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-sheet :height="200" class="ma-2" border></v-sheet>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12" class="mb-2 text-center" style="color: red"
                    >お酒安全委員会</v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <div class="text-h6 text-center">今月のグラフ</div>
    <v-divider class="opacity-100"></v-divider>
  </v-container>
  <!-- 
    <div class="ui active inverted page dimmer" v-if="isCallingApi">
      <div class="ui text loader">Loading</div>
    </div>
    
    <div class="ui divider"></div>
    <div class="ui three column grid">
      <div class="row">
        <div
          class="eight wide column"
          style="text-align: left; font-weight: bold; font-size: 1.5rem"
        >
          ほろ酔いまで
        </div>
        <div class="six wide column" style="text-align: right">
          <a class="ui big blue circular label">{{ user.limitHoroyoi }}</a>
        </div>
        <div class="two wide column">缶</div>
      </div>
    </div>
    <div class="ui grid">
      <div class="row">
        <div
          class="ten wide column"
          style="text-align: left; font-weight: bold; font-size: 1.5rem"
        >
          そこそこ酔いまで
        </div>
        <div class="four wide column" style="text-align: right">
          <a class="ui big blue circular label">{{ user.limitSokoyoi }}</a>
        </div>
        <div class="two wide column">缶</div>
      </div>
    </div>
    <div class="ui grid">
      <div class="row">
        <div
          class="eight wide column"
          style="text-align: left; font-weight: bold; font-size: 1.5rem"
        >
          マジ酔いまで
        </div>
        <div class="six wide column" style="text-align: right">
          <a class="ui big blue circular label">{{ user.limitGatiyoi }}</a>
        </div>
        <div class="two wide column">缶</div>
      </div>
    </div>
    <div class="ui divider"></div>
    <div class="ui grid">
      <div class="row" style="background-color: #f0f0f0">
        <div class="eight wide column" style="text-align: left">
          今月飲んだ本数
        </div>
        <div class="eight wide column" style="text-align: right">7本</div>
      </div>
      <div class="row" style="background-color: #f0f0f0">
        <div class="eight wide column" style="text-align: left">
          生活習慣病リスク
        </div>
        <div class="eight wide column" style="text-align: right">なし</div>
      </div>
    </div>
    <h2 class="blue-text">今月のグラフ</h2>
    <Bar id="userId" :options="chartOptions" :data="chartData" />
  </div> -->
</template>

<script>
import { baseUrl } from "@/assets/config.js";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "Profile",

  components: {
    Bar,
  },

  data() {
    return {
      user: {
        userId: window.localStorage.getItem("userId"),
        affilicationId: window.localStorage.getItem("affilicationId"),
        likeSake: "",
        currentIntoxicationLevel: "",
        limitHoroyoi: null,
        limitSokoyoi: null,
        limitGatiyoi: null,
      },
      succeedMsg: false,
      errorMsg: "",
      isCallingApi: false,
      chartData: {
        labels: [],
        datasets: [
          {
            data: [
              40, 20, 12, 0, 0, 0, 0, 0, 0, 0, 40, 20, 12, 0, 0, 0, 0, 0, 0, 0,
              40, 20, 12, 0, 0, 0, 0, 0, 0, 0,
            ],
            backgroundColor: "blue",
          },
        ],
      },
      chartOptions: {
        responsive: true,
        scales: {
          x: {
            type: "category",
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "本数",
            },
          },
        },
      },
    };
  },
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push({ name: "Login" });
    },

    async fetchUserId() {
      const headers = { Authorization: "mtiToken" };
      try {
        const res = await fetch(
          `${baseUrl}/user?userId=${this.user.userId}&affilicationId=${this.user.affilicationId}`,
          {
            method: "GET",
            headers,
          }
        );

        const jsonData = await res.json();
        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }
        this.user.likeSake = jsonData.likeSake;
      } catch (e) {
        console.error("ユーザーIDの取得中にエラーが発生しました:", e);
        this.errorMsg = e.message;
      }
    },

    async fetchlimitHoroyoi() {
      const headers = { Authorization: "mtiToken" };
      const limitType = 1;

      try {
        const res = await fetch(
          `${baseUrl}/user/limit?userId=${this.user.userId}&currentIntoxicationLevel=${limitType}`,
          {
            method: "GET",
            headers,
          }
        );

        const jsonData = await res.json();

        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }
        this.user.limitHoroyoi = jsonData.limitAlcoholNum;
      } catch (e) {
        console.error("ほろ酔いデータの取得中にエラーが発生しました:", e);
        this.errorMsg = e.message;
      }
    },

    async fetchlimitSokoyoi() {
      const headers = { Authorization: "mtiToken" };
      const limitType = 2;

      try {
        const res = await fetch(
          `${baseUrl}/user/limit?userId=${this.user.userId}&currentIntoxicationLevel=${limitType}`,
          {
            method: "GET",
            headers,
          }
        );

        const jsonData = await res.json();

        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }
        this.user.limitSokoyoi = jsonData.limitAlcoholNum;
      } catch (e) {
        console.error("そこ酔いデータの取得中にエラーが発生しました:", e);
        this.errorMsg = e.message;
      }
    },

    async fetchlimitGatiyoi() {
      const headers = { Authorization: "mtiToken" };
      const limitType = 3;

      try {
        const res = await fetch(
          `${baseUrl}/user/limit?userId=${this.user.userId}&currentIntoxicationLevel=${limitType}`,
          {
            method: "GET",
            headers,
          }
        );

        const jsonData = await res.json();

        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }
        this.user.limitGatiyoi = jsonData.limitAlcoholNum;
      } catch (e) {
        console.error("がち酔いデータの取得中にエラーが発生しました:", e);
        this.errorMsg = e.message;
      }
    },

    async getDays() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth(); // 1月は0、2月は1、…、12月は11
      const days = new Date(year, month + 1, 0).getDate();
      this.chartData.labels = Array.from({ length: days }, (_, i) => i + 1);
      console.log(this.chartData.labels, this.chartData.datasets);
    },

    // async fetchDate() {
    //   this.isCallingApi = true;

    //   const headers = { Authorization: "mtiToken" };

    //   try {
    //     const res = await fetch(`${baseUrl}/date`, {
    //       // APIエンドポイントを設定
    //       method: "GET",
    //       headers,
    //     });

    //     const jsonData = await res.json();

    //     if (!res.ok) {
    //       const errorMessage =
    //         jsonData.message ?? "エラーメッセージがありません";
    //       throw new Error(errorMessage);
    //     }

    //     const date = new Date(jsonData.date); // APIから取得したdate
    //     this.updateChartData(date);
    //   } catch (e) {
    //     console.error("日付の取得中にエラーが発生しました:", e);
    //     this.errorMsg = e.message;
    //   } finally {
    //     this.isCallingApi = false;
    //   }
    // },

    updateChartData(date) {
      const dateList = [
        date.toISOString().split("T")[0], // 今日の日付
        new Date(date)
          .setDate(date.getDate() - 1)
          .toISOString()
          .split("T")[0], // 前日
        new Date(date)
          .setDate(date.getDate() - 2)
          .toISOString()
          .split("T")[0], // さらに前日
      ];

      this.chartData = {
        labels: dateList,
        datasets: [
          {
            data: [40, 20, 12], // ここに実際のデータを設定
            backgroundColor: "#f87979",
          },
        ],
      };
    },

    // 更新用
    async submit() {
      if (this.isCallingApi) {
        return;
      }

      this.isCallingApi = true;

      const headers = { Authorization: "mtiToken" };
      const { userId, likeSake } = this.user;
      const reqBody = { userId, likeSake };

      try {
        const res = await fetch(`${baseUrl}/user`, {
          method: "PUT",
          body: JSON.stringify(reqBody),
          headers,
        });

        const jsonData = await res.json();

        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        this.succeedMsg = true;
      } catch (e) {
        console.error("更新中にエラーが発生しました:", e);
        this.errorMsg = e.message;
      } finally {
        this.isCallingApi = false;
      }
    },

    async getTodayIntakeAlcohol() {},
  },

  mounted() {
    this.fetchUserId();
    this.fetchlimitHoroyoi();
    this.fetchlimitSokoyoi();
    this.fetchlimitGatiyoi();
    this.getDays();
  },
};
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
.ui.main.container {
  margin-bottom: 100px; /* メニューバーの高さと同じ値に設定 */
  padding-bottom: 100px; /* メニューバーの高さを余白として追加 */
}

.licence-card {
  max-width: 600px;
  min-width: 400px;
}

.border-right {
  border-right: 1px solid #000;
}

.border-bottom {
  border-bottom: 1px solid #000;
}

.vertical-text {
  writing-mode: vertical-rl; /* 文字を縦に表示 */
  text-orientation: upright; /* 日本語の縦書きで文字を回転させない */
}
</style>
