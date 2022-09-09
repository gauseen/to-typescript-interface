import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { convertTypes, javaDtoToTypeScriptInterface } from '../../utils';

describe('Extension Test Suite', () => {
  const javaText = `
    public class Model1 {
      /**
       * 年龄
       */
      private Integer  age;

      private String name;
    };

    public class Model2 {
      /**
       * 是否成功
       */
      private Boolean success;

      /**
       * 时间
       */
      private Date createTime;

      private List<String> arr1;

      private List<CustomDTO> arr2;

      private List<Map<String, Object>> arr2;

      private Map<String, Object> obj1;

      private Map<String, CustomDTO> obj2;

      private Map<String, Map<String, List<String>>> obj3;
    };
    `;

  const tsInterfaceText = `
    export interface Model1 {
      /**
       * 年龄
       */
      age?: number;

      name?: string;
    };

    export interface Model2 {
      /**
       * 是否成功
       */
      success?: boolean;

      /**
       * 时间
       */
      createTime?: string;

      arr1?: Array<string>;

      arr2?: Array<CustomDTO>;

      arr2?: Array<Record<string, any>>;

      obj1?: Record<string, any>;

      obj2?: Record<string, CustomDTO>;

      obj3?: Record<string, Record<string, Array<string>>>;
    };
    `;

    assert.strictEqual(convertTypes('String'), 'string');
    assert.strictEqual(convertTypes('List<String>'), 'Array<string>');
    assert.strictEqual(javaDtoToTypeScriptInterface(javaText), tsInterfaceText);

});
