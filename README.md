# to-typescript-interface

`to-typescript-interface` is a VSCode Extension, Convert Java DTO To TypeScript Interface.

## Usage

- vscode install `to-typescript-interface` extension
- Press command
  - Mac `command + shift + p`
  - Windows `ctrl + shift + p`
- input `to ts`
- Press Enter Key

## Example

![Demo]()

input java class:

```java
public class Model {
  /**
   * 年龄
   */
  private Integer age;

  private String name;
};
```

output typescript interface:

```typescript
export interface Model {
  /**
   * 年龄
   */
  age?: number;

  name?: string;
};
```

## About

- [My Github](https://github.com/gauseen)
- [Type-Mapping](https://github.com/vojtechhabarta/typescript-generator/wiki/Type-Mapping)

**Enjoy!**
