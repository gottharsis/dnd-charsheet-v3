<template>
    <div class="spell-card">
        <img :src="imageUrl" alt="" class="bg-img" />
        <h4 @click.prevent="showDescription">{{ name }}</h4>
        <el-row :gutter="5" style="margin: 5px;" type="flex">
            <el-col>
                {{ castingTime }}
            </el-col>
            <el-col>
                {{ range }}
            </el-col>
            <el-col>
                {{ duration }}
            </el-col>
        </el-row>
        <el-divider />
        <div class="spell-card__bonus">
            {{ source }}: {{ hitBonus }} to hit, DC {{ dc }}
        </div>
        <el-tooltip placement="top" effect="light">
            <div slot="content">
                <div><b>Upcast</b></div>
                <el-button
                    v-for="{ text, level: upLevel } in upcastSlots"
                    :key="upLevel"
                    @click="cast(upLevel)"
                >
                    {{ text }}
                </el-button>
            </div>
            <div style="width: 50%; margin: auto;">
                <el-button
                    type="primary"
                    v-if="spell.spell.level > 0"
                    :disabled="!isPossible"
                    @click="cast(level)"
                >
                    Cast
                </el-button>
            </div>
        </el-tooltip>

        <el-dialog
            title="Spell Description"
            :visible.sync="isDescriptionVisible"
        >
            <!--
            /*`
                # ${spell.name}
                *Level ${spell.level} ${spell.school}*
                **Classes:** ${spell.classes.join(", ")}
                **Components:** ${spell.components}
                **Range:** ${spell.range}
                **Duration:** ${spell.duration}
                **Description:** ${spell.description}
                **Casting Time:** ${spell.casting_time}
                **Concentration**: ${spell.concentration ? "Yes" : "No"}
                **Ritual**: ${spell.ritual ? "Yes" : "No"}
            `;*/
            -->
            <h1>{{ name }}</h1>
            <p>
                <i>{{ levelText }}, {{ school }}</i>
            </p>
            <p>
                <b>Classes:</b>
                {{ classes }}
            </p>
            <p>
                <b>Components:</b>
                {{ spell.spell.components }}
            </p>
            <p>
                <b>Range:</b>
                {{ range }}
            </p>
            <p>
                <b>Duration:</b>
                {{ duration }}
            </p>
            <p>
                <b>Casting Time:</b>
                {{ castingTime }}
            </p>
            <p>
                <b>Concentration:</b>
                {{ spell.spell.concentration ? "Yes" : "No" }}
            </p>
            <p>
                <b>Ritual:</b>
                {{ spell.spell.ritual ? "Yes" : "No" }}
            </p>
            <p v-html="fullText"></p>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { SpellBySource, Magic } from "@/models/Magic";
import marked from "marked";

// @ts-ignore
import abjurationImage from "@/assets/schools/abjuration.svg";
// @ts-ignore
import conjurationImage from "@/assets/schools/conjuration.svg";
// @ts-ignore
import divinationImage from "@/assets/schools/divination.svg";
// @ts-ignore
import enchantmentImage from "@/assets/schools/enchantment.svg";
// @ts-ignore
import evocationImage from "@/assets/schools/evocation.svg";
// @ts-ignore
import necromancyImage from "@/assets/schools/necromancy.svg";
// @ts-ignore
import transmutationImage from "@/assets/schools/transmutation.svg";
// @ts-ignore
import illusionImage from "@/assets/schools/illusion.svg";
import { store } from "@/store";
import { Character } from "@/models/Character";

interface UpcastSlot {
    text: string;
    level: number | "pact";
}

export default Vue.extend({
    name: "SpellCard",
    props: {
        spell: Object as PropType<SpellBySource>,
    },
    computed: {
        character(): Character {
            return store.character;
        },
        magic(): Magic {
            return this.character.magic;
        },
        name(): string {
            return this.spell.spell.name;
        },
        source(): string {
            return this.spell.source;
        },
        dc(): number {
            return this.spell.dc;
        },
        hitBonus(): string {
            return this.spell.hitBonus > 0
                ? `+${this.spell.hitBonus}`
                : String(this.spell.hitBonus);
        },
        school(): string {
            return this.spell.spell.school;
        },
        classes(): string {
            return this.spell.spell.classes.join(", ");
        },
        imageUrl(): string {
            switch (this.school) {
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
        duration(): string {
            return this.spell.spell.duration;
        },
        range(): string {
            return this.spell.spell.range;
        },
        castingTime(): string {
            return this.spell.spell.casting_time;
        },
        style(): any {
            return {
                "background-image": `url(${this.imageUrl})`,
            };
        },
        levelText(): string {
            return this.spell.spell.level === 0
                ? "Cantrip"
                : `Level ${this.spell.spell.level}`;
        },
        isPossible(): boolean {
            const level = this.spell.spell.level;
            return (
                this.magic.multiclassSlots[level].remaining > 0 ||
                (this.magic.pactSlot?.level === level &&
                    this.magic.pactSlot?.remaining > 0)
            );
        },
        level(): number {
            return this.spell.spell.level;
        },
        upcastSlots(): UpcastSlot[] {
            const levelString = (level: number, remaining: number) =>
                `Level ${level} (${remaining})`;

            const upcast: UpcastSlot[] = this.magic.multiclassSlots
                .filter((slot) => slot.level > this.level && slot.remaining > 0)
                .map((sl) => ({
                    text: levelString(sl.level, sl.remaining),
                    level: sl.level,
                }));
            const pactSlot = this.magic.pactSlot;

            if (pactSlot && pactSlot.level >= this.level) {
                upcast.push({
                    text: `Pact (Level ${pactSlot.level}, ${pactSlot.remaining})`,
                    level: "pact",
                });
            }
            return upcast;
        },
    },
    data() {
        return {
            fullText: "",
            isDescriptionVisible: false,
        };
    },
    methods: {
        showDescription() {
            if (!this.fullText) {
                this.fullText = marked(this.spell.spell.description);
            }
            this.isDescriptionVisible = true;
        },
        cast(level: number | "pact") {
            if (level === "pact") {
                store.character.magic.pactSlot?.cast();
            } else {
                store.character.magic.cast(level);
            }
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
        // position: absolute;
        // bottom: 0;
        // left: 0;
        // right: 0;
        margin: 5px;
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
