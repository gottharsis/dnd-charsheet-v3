<template>
    <div class="spell-card">
        <img :src="imageUrl" alt="" class="bg-img" />
        <div style="z-index: 10; position: relative;">
            <h4>{{ name }}</h4>
            <el-button type="primary">Cast</el-button>
        </div>
        <div class="spell-card__bonus">+{{ hitBonus }} to hit, DC {{ dc }}</div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { SpellBySource } from "@/models/Magic";
import abjurationImage from "@/assets/schools/abjuration.svg";
import conjurationImage from "@/assets/schools/conjuration.svg";
import divinationImage from "@/assets/schools/divination.svg";
import enchantmentImage from "@/assets/schools/enchantment.svg";
import evocationImage from "@/assets/schools/evocation.svg";
import necromancyImage from "@/assets/schools/necromancy.svg";
import transmutationImage from "@/assets/schools/transmutation.svg";
import illusionImage from "@/assets/schools/illusion.svg";

export default Vue.extend({
    name: "SpellCard",
    props: {
        spell: Object as PropType<SpellBySource>,
    },
    computed: {
        name(): string {
            return this.spell.spell.name;
        },
        source(): string {
            return this.spell.source;
        },
        dc(): number {
            return this.spell.dc;
        },
        hitBonus(): number {
            return this.spell.hitBonus;
        },
        imageUrl(): string {
            switch (this.spell.spell.school) {
                case "Abjuration":
                    return abjurationImage;
                case "Conjuration":
                    return conjurationImage;
                case "Divination":
                    return divinationImage;
                case "Necromancy":
                    return necromancyImage;
                case "Enchantment":
                    return enchantmentImage;
                case "Illusion":
                    return illusionImage;
                case "Evocation":
                    return evocationImage;
                case "Transmutation":
                    return transmutationImage;
                default:
                    return "";
            }
        },
        style(): any {
            return {
                "background-image": `url(${this.imageUrl})`,
            };
        },
    },
});
</script>

<style lang="scss" scoped>
@import "@/styles/horizon.scss";
// @import "@/element-variables.scss"
.spell-card {
    position: relative;
    background: $background-alt;
    padding: 20px;

    // background-size: contain;
    // background-repeat: no-repeat;
    // background-position: center;

    .spell-card__bonus {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-style: italic;
        color: $amethyst;
    }

    .bg-img {
        // position: absolute;
        // top: 10%;
        // bottom: 10%;
        // height: 100%;
        // width: auto;
        // opacity: 0.1;
        // margin-left: auto;
        // margin-right: auto;
        // left: 0;
        // right: 0;
        // text-align: center;
        // // z-index: -2;

        position: absolute;
        top: 10px;
        right: 10px;
        height: 48px;
        width: auto;
        opacity: 0.3;
        color: red;
    }
}
</style>
