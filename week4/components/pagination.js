export default {
    methods: {
        switchCurrent_page(page) {
            this.pagination.current_page = page;
            this.$emit('getProducts', page);
        }
    },
    props: {
        pagination: {
            type: Object,
            required: true,
            validator(value) {
                const verifyKeys = [
                    'total_pages',
                    'current_page',
                    'has_pre',
                    'has_next',
                    'category'
                ];
                const inputkeys = Object.keys(value);
                const lackInputkeys = verifyKeys.filter(
                    (key) => !inputkeys.includes(key)
                );

                if (lackInputkeys.length) {
                    console.warn(
                        `[警告錯誤]pagination 元件 props 資料缺少「${lackInputkeys.join(
                            '、'
                        )}」欄位資料，請修正錯誤！`
                    );
                }

                return lackInputkeys.length ? false : true;
            }
        }
    },
    template: `<nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center pagination-sm">
      <li class="page-item" v-if="pagination.has_pre" :class="{ disabled: pagination.current_page === 1 }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="switchCurrent_page(pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{ 'active pe-none': pagination.current_page === page }"><a class="page-link" href="#" @click.prevent="switchCurrent_page(page)">{{ page }}</a></li>
      <li class="page-item" v-if="pagination.has_next" :class="{ disabled: pagination.current_page === pagination.total_pages }"><a class="page-link" href="#" aria-label="Next" @click.prevent="switchCurrent_page(current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
};
