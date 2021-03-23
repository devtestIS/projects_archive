<template>
  <div>
    <div v-show="enabledVueDropzone && !!stateOfLoadingFile.isTheFileUploaded">
      <div v-if="myProgress === 100" class="sending-request-text">
        <d-progress
          :max="100"
          :value="myProgress"
          height="15px"
          class="mb-2"
          :animated="false"
          :theme="stateOfLoadingFile.stateAfterFileUpload.success"
        />
        {{ stateOfLoadingFile.stateAfterFileUpload.responseText }}
      </div>
    </div>
    <div v-show="!enabledVueDropzone && !!stateOfSendingRequestWithoutFile.isSendedRequest">
      <div v-if="stateOfSendingRequestWithoutFile.myProgressWithoutFile === 100" class="sending-request-text">
        <d-progress
          :max="100"
          :value="stateOfSendingRequestWithoutFile.myProgressWithoutFile"
          height="15px"
          class="mb-2"
          :animated="false"
          :theme="stateOfLoadingFile.stateAfterFileUpload.success"
        />
        {{ supportRequestText }}
      </div>
    </div>
    <div
      v-if="
        stateOfSendingRequestWithoutFile.isTheSendButtonWithoutFilesClicked &&
          !enabledVueDropzone &&
          !stateOfSendingRequestWithoutFile.isSendedRequest &&
          stateOfSendingRequestWithoutFile.myProgressWithoutFile <= 100
      "
      class="sending-request-text"
    >
      <d-progress
        :max="100"
        :value="stateOfSendingRequestWithoutFile.myProgressWithoutFile"
        height="15px"
        class="mb-2"
        :animated="true"
        :theme="stateOfLoadingFile.stateAfterFileUpload.warning"
      />
      Ваша заявка отправляется...
    </div>
    <div
      v-else-if="
        !stateOfLoadingFile.isTheFileUploaded &&
          enabledVueDropzone &&
          stateOfLoadingFile.isTheSendButtonWithFilesClicked &&
          myProgress <= 100
      "
      class="sending-request-text"
    >
      <d-progress
        :max="100"
        :value="myProgress"
        height="15px"
        class="mb-2"
        :animated="true"
        :theme="stateOfLoadingFile.stateAfterFileUpload.warning"
      />
      Ваша заявка отправляется...
    </div>
    <d-form
      v-show="
        !stateOfLoadingFile.isTheSendButtonWithFilesClicked &&
          !stateOfSendingRequestWithoutFile.isTheSendButtonWithoutFilesClicked
      "
      class="form-modal"
    >
      <d-row>
        <d-col sm="12" lg="9">
          <p>
            <strong>Прежде чем подавать заявку в поддержку, ознакомьтесь со справочной информацией</strong>
          </p>
        </d-col>
      </d-row>
      <d-row class="mb-4">
        <d-col sm="12" lg="2">
          <d-link>FAQ</d-link>
        </d-col>
        <d-col sm="12" lg="5">
          <d-link>Документация к API</d-link>
        </d-col>
      </d-row>
      <d-form-row>
        <d-col md="12" class="form-group">
          <label for="heading">Заголовок</label>
          <d-input
            id="heading"
            v-model="form.title"
            type="text"
            name="title"
            placeholder="Короткое описание вашего обращения"
          />
        </d-col>
      </d-form-row>

      <d-form-row>
        <d-col md="12" class="form-group">
          <label for="description">Описание</label>
          <d-textarea id="description" v-model="form.description" style="min-height: 100px;" name="description" />
        </d-col>
      </d-form-row>

      <d-form-row>
        <d-col md="12" class="form-group">
          <label>
            <span v-if="!enabledVueDropzone">Прикрепить файл</span>
            <span v-else>Не прикреплять файл</span> </label
          ><br />
          <d-checkbox v-model="enabledVueDropzone" inline toggle></d-checkbox>
          <div
            v-if="
              stateOfSendingRequestWithoutFile.isTheSendButtonWithoutFilesClicked &&
                !enabledVueDropzone &&
                !stateOfSendingRequestWithoutFile.isSendedRequest &&
                stateOfSendingRequestWithoutFile.myProgressWithoutFile <= 100
            "
            class="sending-request-text"
          >
            <d-progress
              :max="100"
              :value="stateOfSendingRequestWithoutFile.myProgressWithoutFile"
              height="15px"
              class="mb-2"
              :animated="true"
              :theme="stateOfLoadingFile.stateAfterFileUpload.warning"
            />
            Ваша заявка отправляется...
          </div>
        </d-col>
      </d-form-row>

      <transition name="fade">
        <d-form-row v-show="enabledVueDropzone">
          <d-col md="12" class="form-group">
            <div class="dropzone-wrapper">
              <VueDropzone
                id="file"
                ref="dropzone"
                class="dropzone"
                :options="dropzoneOptions"
                :include-styling="false"
                @vdropzone-file-added="vfileAdded"
                @vdropzone-complete="afterComplete"
                @vdropzone-sending-multiple="sendingEvent"
                @vdropzone-removed-file="vremoved"
                @vdropzone-total-upload-progress="vprogress"
              />
            </div>
            <div
              v-if="
                enabledVueDropzone &&
                  !stateOfLoadingFile.isSupportedTypeOfFile &&
                  stateOfLoadingFile.isSupportedTypeOfFile !== null
              "
              id="unsupportedFileTypeError"
            >
              Неверный формат файла... Поддерживаемые форматы .png, .jpeg, .jpg, .docx, .pdf
            </div>
            <div
              v-if="
                enabledVueDropzone &&
                  !stateOfLoadingFile.isPermissibleFileSize &&
                  stateOfLoadingFile.isPermissibleFileSize !== null
              "
              id="isNotPermissibleFilesize"
            >
              Файл должен весить меньше 2-ух мегабайт
            </div>
            <div
              v-if="
                enabledVueDropzone &&
                  stateOfLoadingFile.numberOfFiles !== null &&
                  stateOfLoadingFile.numberOfFiles > dropzoneOptions.maxFiles
              "
              id="counterFilesError"
            >
              Максимальное кол-во файлов которое можно отправить меньше 5
            </div>
          </d-col>
        </d-form-row>
      </transition>

      <d-button
        v-if="!enabledVueDropzone && form.title.length > 0 && form.description.length > 0"
        id="activatedSendButtonWithoutFiles"
        type="button"
        @click="
          triggerSendButton();
          triggerSendWithoutFiles({
            title: form.title,
            description: form.description,
          });
        "
      >
        Отправить
      </d-button>

      <d-button
        v-else-if="
          enabledVueDropzone &&
            stateOfLoadingFile.isPermissibleFileSize &&
            stateOfLoadingFile.isSupportedTypeOfFile &&
            stateOfLoadingFile.isPermissibleFileSize &&
            stateOfLoadingFile.numberOfFiles > 0 &&
            stateOfLoadingFile.numberOfFiles < 5 &&
            form.title.length > 0 &&
            form.description.length > 0
        "
        id="activatedSendButtonWithFiles"
        type="button"
        @click="triggerSendWithFiles()"
      >
        Отправить
      </d-button>

      <d-button v-else id="disabledSendButton" type="button" disabled>
        Отправить
      </d-button>
      <d-button theme="danger" class="ml-3" @click.prevent="$emit('close')">
        Отмена
      </d-button>
    </d-form>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import VueDropzone from 'vue2-dropzone';

const getTemplate = () => `
<div class="dz-preview dz-file-preview">
  <div class="dz-image">
    <div data-dz-thumbnail-bg></div>
  </div>
  <div class="dz-details">
    <div class="dz-size"><span data-dz-size></span></div>
    <div class="dz-filename"><span data-dz-name></span></div>
  </div>
  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
  <div class="dz-error-message"><span data-dz-errormessage></span></div>
  <div class="dz-success-mark"><i class="fa fa-check"></i></div>
  <div class="dz-error-mark"><i class="fa fa-close"></i></div>
</div>
`;

export default {
  name: 'TheSupport',
  components: {
    VueDropzone,
  },
  data() {
    return {
      enabledVueDropzone: false,
      /**
       * @param {Array} files массив файлов отправляемых на сервер
       */
      files: [],
      /**
       * @param {Number} myProgress переменная с числом прогресса (от 0 до 100)
       */
      myProgress: 0,
      /**
       * @param {Array} types_of_file массив с допустимыми форматами файла для отправки
       */
      types_of_file: ['png', 'jpeg', 'jpg', 'docx', 'pdf'],
      /**
       * @param {Object} stateOfLoadingFile объект с состоянием загрузки файлов из VueDropzone
       * @param {Boolean} stateOfLoadingFile.isTheFileUploaded состояние загрузки файла
       * @param {?Boolean} stateOfLoadingFile.isPermissibleFileSize допустимый ли размер в мегабайтах
       * @param {?Boolean} stateOfLoadingFile.isSupportedTypeOfFile допустимый ли формат файла
       * @param {?Number} stateOfLoadingFile.numberOfFiles кол-во файлов в форме
       * @param {Boolean} stateOfLoadingFile.isTheSendButtonWithFilesClicked нажата ли кнопка отправки в форме
       * @param {String} stateOfLoadingFile.stateOfLoadingFile.success строка для компонента <d-progress>, определяет цвет прогресс бара (зеленый)
       * @param {String} stateOfLoadingFile.stateOfLoadingFile.warning строка для компонента <d-progress>, определяет цвет прогресс бара (желтый)
       * @param {?String} stateOfLoadingFile.stateOfLoadingFile.responseText ответ с xhr request после загрузки файлов на сервер
       */
      stateOfLoadingFile: {
        isTheFileUploaded: null,
        isPermissibleFileSize: null,
        isSupportedTypeOfFile: null,
        numberOfFiles: null,
        isTheSendButtonWithFilesClicked: null,
        stateAfterFileUpload: {
          success: 'success',
          warning: 'warning',
          responseText: null,
        },
      },
      /**
       * @param {Object} dropzoneOptions объект с настройками для плагина VueDropzone
       * @param {Object} dropzoneOptions.headers объект хедера для запроса
       * @param {String} dropzoneOptions.headers.Authorization user-token
       * @param {null} dropzoneOptions.headers["Cache-Control"] cache-control description
       * @param {null} dropzoneOptions.headers["X-Requested-With"] x-requested-with description
       * @param {Boolean} dropzoneOptions.autoProcessQueue автоотправка на сервер при загрузке файла в инпут
       * @param {String} dropzoneOptions.url url
       * @param {Number} dropzoneOptions.maxFilesize максимальный размер файла отправляемого на сервер
       * @param {Boolean} dropzoneOptions.uploadMultiple загрузка нескольких файлов на сервер
       * @param {Number} dropzoneOptions.parallelUploads количество для параллельной загрузки файлов на сервер
       * @param {Number} dropzoneOptions.maxFiles максимальное количество файлов загружаемых в инпут
       * @param {Boolean} dropzoneOptions.addRemoveLinks удаление файла из инпута
       * @param {Function} dropzoneOptions.getTemplate загрузить кастомный темплейт для инпута
       * @param {String} dropzoneOptions.dictDefaultMessage сообщение отображаемое в инпуте если нет файлов
       * @param {String} dropzoneOptions.dictRemoveFile сообщение отображаемое в инпуте в колонке 'удалить файл'
       */
      dropzoneOptions: {
        headers: {
          Authorization: `${localStorage.getItem('user-token')}`,
          'Cache-Control': null,
          'X-Requested-With': null,
        },
        autoProcessQueue: false,
        url: '/support/create/',
        maxFilesize: 2, // MB
        acceptedFiles: '.png,.jpeg,.jpg,.docx,.pdf',
        uploadMultiple: true,
        parallelUploads: 4,
        maxFiles: 4,
        addRemoveLinks: true,
        previewTemplate: getTemplate(),
        dictDefaultMessage: 'Передвиньте или добавьте вручную файлы .jpg, .jpeg, .pdf, .docx формата',
        dictRemoveFile: 'Удалить файл',
      },
      /**
       * @param {Object} form объект с v-model для инпутов с title и description
       * @param {String} form.title v-model form.title
       * @param {String} form.description v-model form.description
       */
      form: {
        title: '',
        description: '',
      },
    };
  },
  computed: {
    ...mapState('support', ['supportRequestText', 'stateOfSendingRequestWithoutFile']),
  },
  mounted() {
    this.replaceInput();
  },
  methods: {
    ...mapActions('support', ['triggerSendButton', 'triggerSendWithoutFiles']),
    ...mapMutations('auth/checkoutErrors', ['CHECKOUT_FAILURE', 'CHECKOUT_ERROR_STATUS']),
    replaceInput() {
      let form_modal = document.getElementsByClassName('form-modal')[0];
      let list = document.getElementsByClassName('dz-hidden-input');

      for (let item of list) {
        form_modal.appendChild(item);
      }
    },
    getExtension(filename) {
      let parts = filename.split('.');
      return parts[parts.length - 1];
    },
    checkExtension(file) {
      const extensionOfFile = this.getExtension(file.upload.filename);
      if (this.types_of_file.includes(extensionOfFile)) {
        return true;
      } else {
        return false;
      }
    },
    checkFilesize(file) {
      const bytes = 2000000;
      if (file.upload.total < bytes) {
        return true;
      } else {
        return false;
      }
    },
    parseFileExtensions() {
      for (let element in this.files) {
        let file = this.files[element];
        if (this.checkExtension(file)) {
          this.stateOfLoadingFile.isSupportedTypeOfFile = true;
          continue;
        } else {
          this.stateOfLoadingFile.isSupportedTypeOfFile = false;
          break;
        }
      }
    },
    parseFileSizes() {
      for (let element in this.files) {
        let file = this.files[element];
        if (this.checkFilesize(file)) {
          this.stateOfLoadingFile.isPermissibleFileSize = true;
          continue;
        } else {
          this.stateOfLoadingFile.isPermissibleFileSize = false;
          break;
        }
      }
    },
    countFiles() {
      this.stateOfLoadingFile.numberOfFiles = this.$refs.dropzone.dropzone.files.length;
      this.files = this.$refs.dropzone.dropzone.files;
      this.parseFileExtensions();
      this.parseFileSizes();
    },
    vfileAdded(file) {
      this.countFiles();
      this.$nextTick(() => {
        this.replaceInput();
      });
    },
    vremoved(file, xhr, error) {
      this.countFiles();
    },
    vprogress(totalProgress, totalBytes, totalBytesSent) {
      this.myProgress = Math.floor(totalProgress);
    },
    sendingEvent(file, xhr, formData) {
      formData.append('title', this.form.title);
      formData.append('description', this.form.description);
      for (let element in file) {
        formData.append('files', file[element]);
      }
    },
    triggerSendWithFiles() {
      this.$refs.dropzone.processQueue();
      this.stateOfLoadingFile.isTheSendButtonWithFilesClicked = true;
    },
    afterComplete(file) {
      file.status === 'success'
        ? (this.stateOfLoadingFile.isTheFileUploaded = true)
        : (this.stateOfLoadingFile.isTheFileUploaded = false);
      try {
        this.checkResponseStatus(file.xhr);
      } catch (err) {
        console.error(err);
      }
    },
    checkResponseStatus(xhr) {
      const status = xhr.status;
      let response = '';
      if (status >= 500 && status <= 505) {
        response = 'Ошибка сервера';
      } else {
        response = JSON.parse(xhr.response);
      }
      if (status === 200) {
        this.stateOfLoadingFile.stateAfterFileUpload.responseText = response.success;
      } else if (status === 401) {
        this.$emit('close');
        this.CHECKOUT_ERROR_STATUS(status);
        this.CHECKOUT_FAILURE(response);
      } else if (status >= 500 && status <= 505) {
        this.$emit('close');
        this.CHECKOUT_ERROR_STATUS(status);
        this.CHECKOUT_FAILURE(response);
      }
    },
  },
};
</script>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.dz-success-mark,
.dz-error-message span {
  display: none;
}
.dz-remove {
  align-self: center;
}
.sending-request-text {
  text-align: center;
}
</style>
