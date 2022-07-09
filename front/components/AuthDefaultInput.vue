<template>
  <div class="flex shadow">
    <input
      @input="$emit('input', $event.target.value)"
      :value="value"
      :type="inputType"
      :placeholder="placeholder"
      class="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
    />
    <button
      @click.prevent="handleEmptyClick"
      :class="{ hidden: !emptyButtonActive }"
      class="flex justify-center items-center px-3 py-2 cursor-pointer"
    >
      <svg
        class="text-gray-300 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="14"
        height="14"
        viewBox="0 0 348.333 348.334"
        xml:space="preserve"
      >
        <path
          d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85   c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563   c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85   l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554   L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    props: {
      value: String,
      inputType: {
        type: String,
        default: "text",
      },
      placeholder: {
        type: String,
        default: "",
      },
    },

    methods: {
      handleEmptyClick(): void {
        this.$emit("input", "");
      },
    },

    computed: {
      emptyButtonActive(): boolean {
        if (this.value.length > 0) {
          return true;
        }

        return false;
      },
    },
  });
</script>
