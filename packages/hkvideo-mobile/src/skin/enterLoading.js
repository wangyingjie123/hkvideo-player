/* eslint-disable */
export default function enterLoading() {
    let barStr = '<div class="hkplayer-enter-spinner">';
    for (let i = 1; i <= 12; i++) {
        barStr += `<div class="enter-bar hkplayer-enter-bar${i}"></div>`;
    }
    barStr += '</div>';
    return barStr;
}