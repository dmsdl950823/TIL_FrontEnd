<!-- Dropdown Transition 컴포넌트 백업 -->

<template>
  <section class="dropdown-wrapper">
    <article
      :class="['select-company', { '-selected': !!groupName }, { '-show': showOpt }]"
      @click="showOpt = !showOpt"
    >
      <h4>{{ groupName ? groupName : '관계사' }}</h4>
      <i :class="['mdi mdi-chevron-down', { '-up': showOpt }]" />
    </article>

    <!-- dropdown 영역 -->
    <transition
      @enter="enter"
      @leave="leave"
      @beforeEnter="beforeEnter"
    >
      <article
        v-if="showOpt"
        class="dropdown-area"
      >
        <div class="search-area">
          <el-input
            class="search"
            placeholder="관계사 검색"
            v-model="text"
            @input="searchEvent"
          />
          <i class="search-icon" />
        </div>
        <!-- /. 검색 영역 -->

        <ul class="team-lists-wrapper">
          <li
            v-for="g in resultTree"
            :key="g.groupIdx"
            class="-list"
            @click="selectedGroup(g)"
          >
            {{ g.groupName }}
            ( 조직 {{ g.orgNum }} / 프로젝트 {{ g.prjNum }} )
          </li>
        </ul>
        <!-- 조직 -->
      </article>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    groupTree: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  watch: {
    visible (status) {
      if (!status) this.groupName = undefined
    },
    showOpt (status) {
      if (status) this.text = undefined
      else this.resultTree = this.rawTree
    }
  },
  created () {
    this.rawTree = this.groupTree
    this.resultTree = this.rawTree
  },
  methods: {
    searchEvent (text) {
      const regex = new RegExp(text, 'gi')
      this.resultTree = this.rawTree.filter(g => regex.test(g.groupName))
    },
    selectedGroup (g) {
      this.groupName = g.groupName
      this.showOpt = false
      return this.$emit('selected-group', { groupName: g.groupName, children: g.children })
    },

    // -----------------
    // --- animation ---
    // -----------------
    beforeEnter (el) {
      const targets = el
      this.$anime.timeline().add({ targets, easing: 'easeOutExpo', height: 0 })
    },
    enter (el) {
      const targets = el
      this.$anime.timeline().add({ targets, easing: 'easeOutExpo', height: 250 })
    },
    leave (el, done) {
      const targets = el
      this.$anime.timeline().add({ targets, easing: 'easeOutExpo', paddingTop: 0, paddingBottom: 0, opacity: 0, height: 0, complete: () => done() })
    }
  },
  data () {
    return {
      showOpt: false,
      groupName: undefined,
      text: '',
      rawTree: [],
      resultTree: []
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-wrapper {
  position: relative;
  .select-company {
    border: 1px solid $purple-gray;
    height: 50px;
    box-sizing: border-box;
    padding: 0 $gap;
    line-height: 50px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: .4s ease;
    color: #888888;
    h4 { font-weight: normal; }

    &.-selected { color: $white; }
    &.-show {
      background: $white;
      border-radius: 6px 6px 0 0;
      border-color: $white;
      border-bottom-color: #D9D9D9;
      &.-selected { color: $text-black; }
    }

    .mdi-chevron-down {
      transition: transform .4s ease;
      &.-up { transform: rotate(180deg); }
    }
  }

  .dropdown-area {
    position: absolute;
    width: 100%;
    z-index: 5;
    top: 50px; left: 0;
    box-sizing: border-box;
    border-top: none;
    overflow: hidden;
    background: $white;
    border-radius: 0 0 6px 6px;
    padding: 15px $gap $gap $gap;
    height: 0;
  }

  .search-area {
    margin-bottom: $gap-s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .search-icon {
      width: 20px;
      height: 30px;
      position: absolute;
      right: 0;
      &::before,
      &::after {
        content: '';
        position: absolute;
      }
      &::before {
        width: 13px; height: 13px;
        border: 2px solid $text-black;
        border-radius: 50%;
        top: 5px; left: 0;
      }
      &::after {
        width: 7px; height: 2px;
        transform: rotate(45deg);
        background-color: $text-black;
        bottom: 7px; right: 0px;
      }
    }
  }

  .team-lists-wrapper {
    color: $color-grey;
    height: 170px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
      background: transparent;
    }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb {
      background: #D3D3D3;
      background-clip: padding-box;
    }

    .-list {
      line-height: 2;
      cursor: pointer;
      transition: color .2s ease;
      &:hover { color: $text-black; }
    }
  }
}
</style>

<style lang="scss">
.dropdown-wrapper {
  .search-area {
    .search {
      .el-input__inner {
        padding: 0;
        padding-right: 30px;
        border: none;
        border-bottom: 1px solid #E0E0E0;
        color: $text-black;
        &::placeholder { color: $color-grey; }
      }
    }
  }
}
</style>
