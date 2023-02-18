<script>
import { mapActions, mapState } from "pinia";
import { OrderStore } from "../stores/OrderStore.js";

export default {
    data() {
        return {
            switchIsPaid: true
        };
    },
    props: {
        order: {
            type: Object,
            required: true,
            deep: true
        },
        updateMethod: {
            type: String,
            required: false,
            default: "immediate" // "immediate"(即時)、"parent"(父層)
        },
        isLgSize: {
            type: Boolean,
            required: false,
            default: false
        },
        page: {
            type: Number,
            required: true
        }
    },
    mounted() {
        this.switchIsPaid = this.order.is_paid;
    },
    computed: {
        ...mapState(OrderStore, ["is_paid"])
    },
    watch: {
        order() {
            this.switchIsPaid = this.order.is_paid;
        }
    },
    methods: {
        ...mapActions(OrderStore, ["editOrder"]),
        changeIsPaid() {
            if (this.updateMethod === "parent") {
                this.$emit("setIsPaid", this.switchIsPaid);
            } else if (this.updateMethod === "immediate") {
                this.editOrder(this.order.id, this.switchIsPaid, this.page);
            }
        },
        getTimestamp() {
            return new Date().getTime();
        }
    }
};
</script>

<template>
    <sweetalert-component ref="sweetalert"></sweetalert-component>
    <div class="form-check form-switch" :class="{ 'form-control-lg m-0': isLgSize }">
        <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            :id="`${order.id}-${getTimestamp()}`"
            v-model.lazy="switchIsPaid"
            @change="changeIsPaid"
        />
        <label class="form-check-label fw-bold" :for="`${order.id}-${getTimestamp()}`">{{ switchIsPaid ? "已付款" : "未付款" }}</label>
    </div>
</template>
