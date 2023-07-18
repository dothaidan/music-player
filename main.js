const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");

const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name: "song 1",
            singer: "singer 1",
            path: "./assets/music/[MIXSET]  Vitamin Sea - TrugB.mp3",
            image: "./assets/img/[MIXSET]  Vitamin Sea - TrugB.jpg",
        },
        {
            name: "song 2",
            singer: "singer 2",
            path: "./assets/music/Chay Pho 3.0  Hdung x RiverDLove.mp3",
            image: "./assets/img/Chay Pho 3.0  Hdung x RiverDLove.jpg",
        },
        {
            name: "song 3",
            singer: "singer 3",
            path: "./assets/music/DON MIXSET  HỒNG NHAN - DAN GIAN DUONG DAI - KENN LE.mp3",
            image: "./assets/img/DON MIXSET HỒNG NHAN - DAN GIAN DUONG DAI.jpg",
        },
        {
            name: "song 4",
            singer: "singer 4",
            path: "./assets/music/GRUSI - MIXTAPE VIỆT MIX _ HAPPY FOR YOU REMIX _ Deep House, G House, House lak _ ĐEO KHẨU TRANG VÀO.mp3",
            image: "./assets/img/GRUSI - MIXTAPE VIỆT MIX  HAPPY FOR YOU REMIX  Deep House, G House, House lak  ĐEO KHẨU TRANG VÀO.jpg",
        },
        {
            name: "song 5",
            singer: "singer 5",
            path: "./assets/music/LAK DISTRICT #1 by. RiverDLove & MILO.mp3",
            image: "./assets/img/song 5.jpg",
        },
        {
            name: "song 6",
            singer: "singer 6",
            path: "./assets/music/MIXSET - Trên tình bạn dưới tình yêu  LINH KU X LONG NHỎ VOL2.mp3",
            image: "./assets/img/MIXSET - Trên tình bạn dưới tình yêu.jpg",
        },
        {
            name: "song 7",
            singer: "singer 7",
            path: "./assets/music/Nonstop Lêu Hêu Vol 3 Dont Break My Heart.mp3",
            image: "./assets/img/Nonstop Lêu Hêu Vol 3 Dont Break My Heart.jpg",
        },
        {
            name: "song 8",
            singer: "singer 8",
            path: "./assets/music/The Reason To Love Me X  Brotherhood ( FT LONG NHAT ).mp3",
            image: "./assets/img/The Reason To Love Me X  Brotherhood ( FT LONG NHAT ).jpg",
        },
        {
            name: "song 9",
            singer: "singer 9",
            path: "./assets/music/VOL17 TITAN GLAMPING WOMEN DAY 8-3.mp3",
            image: "./assets/img/VOL17 TITAN GLAMPING WOMEN DAY 8-3.jpg",
        },
        {
            name: "song 10",
            singer: "singer 10",
            path: "./assets/music/Mixtape - Flores by Quan ADN & LONGGZ.mp3",
            image: "./assets/img/Mixtape - Flores by Quan ADN & LONGGZ.jpg",
        },
    ],
    render: function () {
        const htmls = this.songs.map((song) => {
            return `
                <div class="song">
                <div
                    class="thumb"
                    style="
                        background-image: url('${song.image}');">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
                `;
        });
        $(".playlist").innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop =
                window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        // Xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        // Khi bài hát play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
        };

        // Khi bài hát pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
        };

        // xử lý thanh trượt khi bài hát play
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent =
                    (audio.currentTime / audio.duration) * 100;
                progress.value = progressPercent;
            }
        };

        // Xử lý khi tua bài hát
        progress.onchange = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        };
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url("${this.currentSong.image}")`;
        audio.src = this.currentSong.path;
    },
    start: function () {
        // Định nghĩa các thuộc tính cho obj
        this.defineProperties();

        // Lắng nghe, xử lý các sự kiện (DOM Events)
        this.handleEvents();

        // Tải thông tin bài hát đầu tiền vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // Render playlist
        this.render();
    },
};

app.start();
