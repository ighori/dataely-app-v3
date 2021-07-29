/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import AnalyzerResultUpdateComponent from '@/entities/analyzer-result/analyzer-result-update.vue';
import AnalyzerResultClass from '@/entities/analyzer-result/analyzer-result-update.component';
import AnalyzerResultService from '@/entities/analyzer-result/analyzer-result.service';

import DataSourceService from '@/entities/data-source/data-source.service';

import FileSourceService from '@/entities/file-source/file-source.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('AnalyzerResult Management Update Component', () => {
    let wrapper: Wrapper<AnalyzerResultClass>;
    let comp: AnalyzerResultClass;
    let analyzerResultServiceStub: SinonStubbedInstance<AnalyzerResultService>;

    beforeEach(() => {
      analyzerResultServiceStub = sinon.createStubInstance<AnalyzerResultService>(AnalyzerResultService);

      wrapper = shallowMount<AnalyzerResultClass>(AnalyzerResultUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          analyzerResultService: () => analyzerResultServiceStub,

          dataSourceService: () => new DataSourceService(),

          fileSourceService: () => new FileSourceService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.analyzerResult = entity;
        analyzerResultServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(analyzerResultServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.analyzerResult = entity;
        analyzerResultServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(analyzerResultServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundAnalyzerResult = { id: 123 };
        analyzerResultServiceStub.find.resolves(foundAnalyzerResult);
        analyzerResultServiceStub.retrieve.resolves([foundAnalyzerResult]);

        // WHEN
        comp.beforeRouteEnter({ params: { analyzerResultId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.analyzerResult).toBe(foundAnalyzerResult);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
